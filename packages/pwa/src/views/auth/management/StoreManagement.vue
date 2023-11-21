<template>
    <main v-if="firebaseUser" class="flex flex-col pl-20 pr-4 pt-12 bg-slate-100 flex-1 rounded-l-3xl h-screen overflow-y-auto">
      <DashboardTitle currentRoute="Store Management" />
      <AssignPersonPopup v-if="showPopup" @close="closeAssignPersonPopup" @choose-employee="handleAssignEmployee"/>      
      <div v-for="task of tasksResult" class="flex-col">
        <div v-for="item of task" class="flex p-6 bg-white mt-5 w-8/10 justify-between rounded-lg">
          <div class="flex flex-col">
            <p class="text-5">{{ item.shopName }}</p>
            <p class="text-3 opacity-50">{{ formatDateTime(item.createdAt) }}</p>
          </div>
          <div class="flex gap-5">
            <button v-if="!item.persons[0]?.profilePicture" @click="assignTask(item?.id)" class="py-4 w-95 bg-primary-green color-white font-medium rounded-lg">Assign an employee</button>
            <div v-else class="flex gap-5">
              <button @click="printPDF(item)" class="p-4 w-50 bg-primary-green color-white font-medium rounded-lg">Print stock overview</button>
              <button @click="completeTask(item.id)" class="p-4 w-40 bg-primary-green color-white font-medium rounded-lg">Done</button>
            </div>
            <div class="relative w-12 h-12 mt-1">
              <UserCircle2 class="absolute w-full h-full"/>
              <!-- Hier moet er dan een controle of er een image is, zoja toon die -->
              <div class="hidden absolute w-full h-full bg-black rounded-full"></div>
              <img v-if="item.persons[0]?.profilePicture" :src=item.persons[0]?.profilePicture class="absolute w-full h-full rounded-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </main>
  </template>
  
<script lang="ts">
  import DashboardTitle from '@/components/dashboard/DashboardTitle.vue'
  import AssignPersonPopup from '@/components/AssignPersonPopup.vue';
  import useFirebase from '@/composables/useFirebase'
  import useCustomPerson from '@/composables/useCustomPerson'
  import { useQuery } from '@vue/apollo-composable'
  import { GET_TASKS } from '@/graphql/task.query' 
  import { UPDATE_TASK } from '@/graphql/task.mutation'
  import { useMutation } from '@vue/apollo-composable'
  import { UserCircle2 } from 'lucide-vue-next'
  import { ref } from 'vue';

  
  const { firebaseUser } = useFirebase()
  const { customPerson } = useCustomPerson()
  
  export default {
    components: {
      DashboardTitle,
      UserCircle2,
      AssignPersonPopup
    },
    data() {
      return {
        showPopup: false
      }
    },
    methods: {
      closeAssignPersonPopup() {
        this.showPopup = false;
      },
      handleAssignEmployee(employee: any) {
        this.updateTaskInput({updateTaskInput: {
          id: this.currentTaskId,
          persons: employee.id
        }})      
      },
    },
    setup() {
      const { result: tasksResult } = useQuery(GET_TASKS)
      const { mutate: updateTaskInput } = useMutation(UPDATE_TASK)
      const showPopup = ref(false);
      const currentTaskId = ref('');

      // TODO: JE MOET EERST EEN PERSON ASSIGNEN VOORDAT JE DE PDF KAN PRINTEN EN IK ZOU DUS EERSTE EEN KNOP ASSIGN EMPOYEE
      // TONEN EN ALS DIE IS GEASSIGNED DAN KAN JE DE PDF PRINTEN EN DONE KLIKKEN EN DAN MOET HET VERVAGEN EN UITEINGELIJK VERDWIJNEN

      // TODO: ALS JE OP DONE KLIKT MOET JE KIJKN OF JE AL OP DE PRINT BUTTON GEKLIKT HEBT

      // TODO: ONDERAAN DE TASKS WIL IK EEN LIST MET DE VERWIJDERDE TASKS OP RECENTSTE DATUM MET EEN RESTORE BUTTON
      // ZODAT JE ZE TERUG KAN ZETTEN MOET JE PERONGELIJK OP DONE GEKLIKT HEBBEN

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
                    <p>Name: ${customPerson.value?.fullName}</p>
                    <p>Created At: ${formatDateTime(item.createdAt)}</p>
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

      const completeTask = ( itemId: any ) => {
        console.log(itemId)
        // TODO: Dit moet uit de database gaan, mss met een status ofzo
      }

  
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
        updateTaskInput
      }
    }
  }
  </script>
  