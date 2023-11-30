import { Injectable } from '@nestjs/common';
import { CreatePersonInput } from './dto/create-person.input';
import { UpdatePersonInput, UpdateNavContainerStateInput } from './dto/update-person.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { MongoRepository } from 'typeorm';
import { PersonType } from 'src/interfaces/IPersonType';
import { JobType } from 'src/interfaces/IJobType';
import { ObjectId } from 'mongodb';

@Injectable()
export class PersonsService {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: MongoRepository<Person>,
  ) {}

  create(uid: string, createPersonInput: CreatePersonInput): Promise<Person> {
    try {
      const p = new Person()
      p.uid = uid
      p.personType = createPersonInput.personType ?? PersonType.VISITOR
      p.jobType = createPersonInput.jobType
      p.firstName = createPersonInput.firstName
      p.lastName = createPersonInput.lastName
      p.fullName = createPersonInput.fullName
      p.personalEmail = createPersonInput.personalEmail
      p.workEmail = createPersonInput.workEmail
      p.locale = createPersonInput.locale ?? 'en'
      p.phone = createPersonInput.phone
      p.createdAt = new Date()
      p.updatedAt = new Date()

      if(createPersonInput.personType === PersonType.MANAGER) {
        p.navContainerState = true
      }
      
      return this.personRepository.save(p)
    } catch (error) {
      throw error
    }
  }
  
  findAll(): Promise<Person[]> {
    return this.personRepository.find();
  }

  findOneById(id: string): Promise<Person> {
    // @ts-ignore
    return this.personRepository.findOne({_id: new ObjectId(id)});
  }

  findOneByUid(uid: string): Promise<Person> {
    return this.personRepository.findOne({ where: { uid: uid } })
  }

  findByPersonType(personType: PersonType): Promise<Person[]> {
    return this.personRepository.find({ where: { personType: personType } })
  }

  findByJobType(jobType: JobType): Promise<Person[]> {
    return this.personRepository.find({ where: { jobType: jobType } })
  }

  findBySearchString(searchString: string): Promise<Person[]> {
    return this.personRepository.find({ 
      // @ts-ignore
      fullName: { $regex: searchString, $options: 'i' },
      personType: PersonType.EMPLOYEE,
    })
  }

  async assignAlertId(personId: string, alertId: string): Promise<void> {
    try {
      const p = await this.findOneById(personId)
      p.assignedAlerts = p.assignedAlerts? p.assignedAlerts : []

      if (p.assignedAlerts.includes(alertId)) throw new Error('Alert already assigned to person')

      p.assignedAlerts.push(alertId)
      await this.personRepository.save(p)
    } catch (error) {
      throw new Error(error)
    }
  }

  update(id: string, updatePersonInput: UpdatePersonInput): Promise<Person> {
    try {
      let p: Person = new Person()
      p.id = id
      p.uid = updatePersonInput.userId? updatePersonInput.userId : null
      p.personType = updatePersonInput.personType? updatePersonInput.personType : null
      p.jobType = updatePersonInput.jobType? updatePersonInput.jobType : null
      p.firstName = updatePersonInput.firstName? updatePersonInput.firstName : null
      p.lastName = updatePersonInput.lastName? updatePersonInput.lastName : null
      p.fullName = updatePersonInput.fullName? updatePersonInput.fullName : null
      p.personalEmail = updatePersonInput.personalEmail? updatePersonInput.personalEmail : null
      p.workEmail = updatePersonInput.workEmail? updatePersonInput.workEmail : null
      p.phone = updatePersonInput.phone? updatePersonInput.phone : null
      p.createdAt = updatePersonInput.createdAt? updatePersonInput.createdAt : null
      p.updatedAt = new Date()
      return this.personRepository.save(p)
    } catch (error) {
      throw error
    }
  }

  async updateNavContainerState(id: string, updateNavContainerStateInput: UpdateNavContainerStateInput): Promise<Person> {
    try {
      const p = await this.findOneById(id)
      p.navContainerState = updateNavContainerStateInput.navContainerState
      return this.personRepository.save(p)
    } catch (error) {
      throw error
    }
  }

  async updateLocale(id: string, locale: string): Promise<Person> {
    try {
      const p = await this.findOneById(id)
      p.locale = locale
      return this.personRepository.save(p)
    } catch (error) {
      throw error
    }
  }

  async removeAssignedAlert(personId: string, alertId: string): Promise<void> {
    try {
      const p = await this.findOneById(personId)

      p.assignedAlerts = p.assignedAlerts.filter((id) => id !== alertId.toString())
      await this.personRepository.save(p)
    } catch (error) {
      throw error
    }
  }

  async remove(id: string) {
    if (await this.personRepository.delete(id)){
      return this.personRepository.delete(id);
    }

    throw new Error(`Person with id ${id} not found`);
  }

  // seeding logic

  saveAllPersons(persons: Person[]) {
    return this.personRepository.save(persons);
  }

  truncate() {
    return this.personRepository.clear();
  }
}
