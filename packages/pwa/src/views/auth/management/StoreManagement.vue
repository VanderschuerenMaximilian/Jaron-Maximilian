<template>
  <main v-if="firebaseUser" class="flex flex-col pl-4 pr-4 pt-14 sm:pl-20 sm:pr-4 sm:pt-12 bg-slate-100 flex-1 rounded-l-3xl h-screen overflow-y-auto overflow-x-auto whitespace-nowrap">
      <DashboardTitle currentRoute="Store Management" />
      <AssignPersonPopup v-if="showPopup" @close="closeAssignPersonPopup" @choose-employee="handleAssignEmployee" :$emit="$emit" />
        <div class="flex-col mb-10 ">
          <button @click="toggleTasks" class="text-primary-green cursor-pointer hover:opacity-80 button-focus">
            <ChevronDown class="inline-block" :class="showTasks? 'rotate-180' : 'rotate-0'"/>
            {{ showTasks ? 'Hide Tasks' : 'Show Tasks' }} 
          </button>
          <div v-if="showTasks && !taskLoading">
              <p v-if="filteredTasks.length === 0">No tasks available.</p>
              <div v-for="item of socketTasks" class="overflow-auto min-w-130">
                  <div v-if="shouldShowTask(item)" :style="{ opacity: removedTasks.find((element) => element === item.id) ? 0 : 1, transition: 'opacity 0.5s ease-in-out' }" class="bg-white mt-5 flex p-6 justify-between rounded-lg">
                    <div class="flex flex-col">
                      <p class="lg:text-5 text-4">{{ item.shopName }}</p>
                      <p class="text-3 opacity-50 text-2">{{ formatDateTime(item.createdAt) }}</p>
                    </div>

                    <div class="flex gap-5">
                      <button v-if="!item.persons[0]?.profilePicture" @click="assignTask(item?.id)" class="py-4 w-48 text-3 xl:text-4 sm:text-3 xl:w-75 max-h-14 bg-primary-green hover:opacity-80 color-white font-medium rounded-lg button-focus">Assign an employee</button>
                      <div v-else class="flex gap-2">
                        <button @click="printPDF(item)" class="p-4 w-30 xl:w-43 text-3 xl:text-4 my-auto max-h-14 bg-primary-green hover:opacity-80 color-white font-medium rounded-lg button-focus">Print overview</button>
                        <button @click="completeTask(item)" class="p-4 w-16 xl:w-30 text-3 my-auto xl:text-4 max-h-14 bg-primary-green hover:opacity-80 color-white font-medium rounded-lg button-focus">Done</button>
                      </div>
                      <div class="relative w-12 h-12 mt-1">
                        <UserCircle2 class="absolute w-full h-full"/>
                        <div class="hidden absolute w-full h-full bg-black rounded-full"></div>
                        <button v-if="item.persons[0]?.profilePicture" @click="removeAssignPerson(item)" class="group w-full h-full rounded-full focus:outline-none">
                          <img  :src=item.persons[0]?.profilePicture class="absolute w-full h-full left-0 top-0 rounded-full focus object-cover" />
                          <XCircle class="absolute w-full h-full left-0 top-0 opacity-0 group-focus:opacity-100 hover:opacity-100 bg-white bg-opacity-20 rounded-full"/>
                        </button>
                      </div>
                    </div>
                  </div>
              </div>
          </div>
          <div v-if="!taskLoading"></div>
          <div v-else>
            <div class="min-w-130 bg-slate-200 h-25 rounded-lg mt-5 animate-pulse"></div>
            <div class="min-w-130 bg-slate-200 h-25 rounded-lg mt-5 animate-pulse"></div>
            <div class="min-w-130 bg-slate-200 h-25 rounded-lg mt-5 animate-pulse"></div>
          </div>
        </div>
        <button @click="toggleCompletedTasks" class="text-primary-green cursor-pointer mt-2 text-left hover:opacity-80 w-fit p-1 button-focus">
          <ChevronDown class="inline-block" :class="showCompletedTasks? 'rotate-180' : 'rotate-0'"/>
          {{ showCompletedTasks ? 'Hide completed tasks' : 'Show completed tasks' }}
        </button>
        <div v-if="showCompletedTasks && !taskLoading" class="">
          <p v-if="filteredCompletedTasks.length === 0">No tasks available.</p>
          <div v-for="item of reversedCompletedTasks" class="mt-5 min-w-130 max-h-60">
            <div v-if="item.completed == true" class="bg-slate-200 flex p-6 justify-between rounded-lg">
              <div class="flex flex-col">
                <p class="lg:text-5 text-4">{{ item.shopName }}</p>
                <p class="text-3 opacity-50 text-2">{{ formatDateTime(item.createdAt) }}</p>
              </div>
              <div class="flex gap-5">
                <button @click="undoTask(item)" class="p-4 w-30 xl:w-43 text-3 xl:text-4 my-auto max-h-14 bg-primary-green hover:opacity-80 color-white font-medium rounded-lg button-focus">Undo Task</button>
                <div class="relative w-12 h-12 mt-1">
                  <UserCircle2 class="absolute w-full h-full"/>
                  <div class="hidden absolute w-full h-full bg-black rounded-full"></div>
                  <img v-if="item.persons[0]?.profilePicture" :src=item.persons[0]?.profilePicture class="absolute w-full h-full rounded-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="!taskLoading"></div>
        <div v-else>
            <div class="min-w-130 bg-slate-200 h-25 rounded-lg mt-5 animate-pulse"></div>
            <div class="min-w-130 bg-slate-200 h-25 rounded-lg mt-5 animate-pulse"></div>
            <div class="min-w-130 bg-slate-200 h-25 rounded-lg mt-5 animate-pulse"></div>
          </div>
    </main>
  </template>
  
<script lang="ts">
  import DashboardTitle from '@/components/dashboard/DashboardTitle.vue'
  import AssignPersonPopup from '@/components/AssignPersonPopup.vue';
  import { useQuery, useSubscription } from '@vue/apollo-composable';
  import useFirebase from '@/composables/useFirebase'
  import useCustomPerson from '@/composables/useCustomPerson'
  import { UPDATED_TASKS, ADDED_TASKS } from '@/graphql/task.subscription'
  import { GET_TASKS } from '@/graphql/task.query' 
  import { UPDATE_TASK } from '@/graphql/task.mutation'
  import { REMOVE_PENDING } from '@/graphql/stock.query'
  import { useMutation } from '@vue/apollo-composable'
  import { UserCircle2, ChevronDown, XCircle } from 'lucide-vue-next'
  import { computed, ref, watch, watchEffect } from 'vue';

  
  const { firebaseUser } = useFirebase()
  const { customPerson } = useCustomPerson()
  
  export default {
    components: {
      DashboardTitle,
      UserCircle2,
      AssignPersonPopup,
      ChevronDown,
      XCircle
    },
    setup() {
      const { result: tasksResult, loading: taskLoading } = useQuery(GET_TASKS)
      const { mutate: updateTaskInput } = useMutation(UPDATE_TASK)
      const { result: updatedTasks } = useSubscription(UPDATED_TASKS)
      const { result: addedTasks } = useSubscription(ADDED_TASKS)
      const { mutate: removePending } = useMutation(REMOVE_PENDING) as any;
      const removedTasks = ref([])
      const showPopup = ref(false);
      const currentTaskId = ref('');
      const socketTasks = ref([]) as any
      const showTasks = ref(true)
      const showCompletedTasks = ref(true)
      const isSocketTasksMade = ref(false)  

      const filteredTasks = computed(() => {
        return socketTasks.value.filter((item: any) => shouldShowTask(item));
      });

      const filteredCompletedTasks = computed(() => {
        return socketTasks.value.filter((item: { completed: boolean; }) => item.completed == true);
      });

      const reversedCompletedTasks = computed(() => {
        return [...socketTasks.value].reverse();
      });

      watch(addedTasks, (data: any) => {
        socketTasks.value.push(data.taskAdded);
      });

      const closeAssignPersonPopup = () => {
        showPopup.value = false;
      }
      const shouldShowTask = (item: any) => {
        return item.completed !== true && item.completed !== undefined || item.completed == null &&
          !removedTasks.value.includes(item.id as never);
      }

      watchEffect(() => {
        if (!isSocketTasksMade.value) {
          if (tasksResult.value && tasksResult.value.tasks.length > 0) {
            for (const task of tasksResult.value.tasks) {
              const taskExists = socketTasks.value.some((existingTask: { id: any; }) => existingTask.id === task.id);
              if (!taskExists) {
                socketTasks.value.push(task);
              }
            }
            isSocketTasksMade.value = true;
          }
        }
      })

      const handleAssignEmployee = (employee: any) => {
        updateTaskInput({updateTaskInput: {
          id: currentTaskId.value,
          persons: employee.id
        }})  
      }

      const removeAssignPerson = (item: any) => {
        updateTaskInput({updateTaskInput: {
          id: item.id,
          persons: null
        }})
      }

      watch(updatedTasks, (data: any) => {
          const updatedTask = data.tasksUpdated as any;
          const taskIndex = socketTasks.value.findIndex((task: { id: any }) => task.id === updatedTask.id);
          if (taskIndex !== -1) {
            socketTasks.value[taskIndex] = { ...socketTasks.value[taskIndex], persons: updatedTask.persons };
            if (updatedTask.completed) {
              if (!removedTasks.value.includes(updatedTask.id as never)) {
                removedTasks.value.push(updatedTask.id as never);
              }
              socketTasks.value[taskIndex].completed = true;
            }
            if (!updatedTask.completed) {
              removedTasks.value.splice(removedTasks.value.indexOf(updatedTask.id as never), 1);
              const task = socketTasks.value.find((task: { id: any }) => task.id === updatedTask.id)
              if (socketTasks.value.findIndex((task: { id: any }) => task.id === updatedTask.id) !== -1) {
                task.completed = false;
              }
            }
          }
        });

      const toggleTasks = () => {
        showTasks.value = !showTasks.value
      }

      const toggleCompletedTasks = () => {
        showCompletedTasks.value = !showCompletedTasks.value
      }

      const printPDF = (item: any) => {
        const stockItemsContent = ['']
        for (let stockItems of item.stockItems) {
          if (stockItems.difference === 0) continue
            stockItemsContent.push(`
                <tr>
                    <td>${stockItems.name}</td>
                    <td>${stockItems.difference}</td>
                </tr>
            `)
        }

        const printContent = `
            <html>
                <head>
                    <title>Stock Overview</title>
                    <style>
                        body {
                            font-family: 'Arial', sans-serif;
                            color: #333;
                        }
                        h1 {
                            color: #00733C;
                        }
                        table {
                            width: 100%;
                            border-collapse: collapse;
                            margin-top: 20px;
                        }
                        th {
                            padding: 10px;
                            text-align: left;
                            color: #00733C;
                        }
                        td {
                            border: 1px solid #00733C;
                            padding: 10px;
                            text-align: left;
                        }
                    </style>
                </head>
                <body>
                    <h1>Stock Overview - ${item.shopName}</h1>
                    <p>Created By: ${customPerson.value?.fullName}</p>
                    <p>Created At: ${formatDateTime(item.createdAt)}</p>
                    <p>Executed by: ${item.persons[0]?.fullName}</p>
                    <p>Execution At: ${new Date().toLocaleString()}</p>
                    <table>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${stockItemsContent}
                        </tbody>
                    </table>
                </body>
            </html>
        `;

    const printWindow = window.open('', '_blank');
    printWindow!.document.write(printContent);
    printWindow!.document.close();
    printWindow!.print();
      };

      const formatDateTime = (createdAt: string | number | Date) => {
        const dateObject = new Date(createdAt)
        return dateObject.toLocaleString('nl-BE', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          hour12: false
        })
      }

      const assignTask = (id:string) => {
        currentTaskId.value = id;
        showPopup.value = true;
      }
     
      const completeTask = (item: any) => {
        let isPendingRemoved = ref(false);
        const stockItems = item.stockItems.map((stockItem: any) => {
          return {
            name: stockItem.name,
            difference: stockItem.difference
          }
        })
        const removePendingResult = removePending({facilityName: item.shopName, isUndone: false, stockItems: stockItems})
        const itemId = item.id;
        removePendingResult
          .then((result: any) => {
            isPendingRemoved.value = true;
           
          })
          .catch((error: { message: any; }) => {
            isPendingRemoved.value = false;
            alert(error.message);
          }); 
          if (isPendingRemoved) {
            if (!removedTasks.value.includes(itemId as never)) {
            removedTasks.value.push(itemId as never);
          }
          setTimeout(() => {
          updateTaskInput({updateTaskInput: {
            id: itemId,
              completed: true
            }})
            const task = socketTasks.value.find((task: { id: any }) => task.id === itemId)
            if (socketTasks.value.findIndex((task: { id: any }) => task.id === itemId) !== -1) {
              task.completed = true;
            }
          }, 500); 
          }
      };

      const undoTask = (item: any) => {
        let isPendingRemoved = ref(false);
        const stockItems = item.stockItems.map((stockItem: any) => {
          return {
            name: stockItem.name,
            difference: stockItem.difference
          }
        })
        const removePendingResult = removePending({facilityName: item.shopName, isUndone: true, stockItems: stockItems})
        const itemId = item.id;
        removePendingResult
          .then((result: any) => {
            isPendingRemoved.value = true;
            
          })
          .catch((error: { message: any; }) => {
            isPendingRemoved.value = false;
            alert(error.message);
          }); 

          if (isPendingRemoved) {
            const itemId = item.id;
            updateTaskInput({updateTaskInput: {
              id: itemId,
              completed: false
            }})
            const items = item.stockItems.map((stockItem: any) => {
              return {
                name: stockItem.name,
                difference: stockItem.difference
              }
            })
            removedTasks.value.splice(removedTasks.value.indexOf(itemId as never), 1);
            const task = socketTasks.value.find((task: { id: any }) => task.id === itemId)
            if (socketTasks.value.findIndex((task: { id: any }) => task.id === itemId) !== -1) {
              task.completed = false;
            }
          }
      };

      return {
        firebaseUser,
        customPerson,
        tasksResult,
        formatDateTime,
        printPDF,
        assignTask,
        completeTask,
        showPopup,
        currentTaskId,
        updateTaskInput,
        removedTasks,
        socketTasks,
        handleAssignEmployee,
        toggleTasks,
        toggleCompletedTasks,
        showTasks,
        showCompletedTasks,
        reversedCompletedTasks,
        undoTask,
        removeAssignPerson,
        taskLoading,
        closeAssignPersonPopup,
        filteredTasks,
        filteredCompletedTasks,
        shouldShowTask

      }
    }
  }
  </script>
  