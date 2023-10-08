import { Injectable } from '@nestjs/common';
import { CreatePersonInput } from './dto/create-person.input';
import { UpdatePersonInput } from './dto/update-person.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { ObjectId, Repository } from 'typeorm';
import { PersonType } from 'src/interfaces/IPersonType';

@Injectable()
export class PersonsService {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ) {}

  create(createPersonInput: CreatePersonInput): Promise<Person> {
    try {
      const p = new Person()
      // p.userId = createPersonInput.userId
      p.personType = createPersonInput.personType
      p.firstName = createPersonInput.firstName
      p.lastName = createPersonInput.lastName
      p.fullName = createPersonInput.fullName
      p.personalEmail = createPersonInput.personalEmail
      p.workEmail = createPersonInput.workEmail
      p.phone = createPersonInput.phone
      p.createdAt = new Date()
      p.updatedAt = new Date()
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

  findByPersonType(personType: PersonType): Promise<Person[]> {
    return this.personRepository.find({ where: { personType: personType } })
  }

  findBySearchString(searchString: string): Promise<Person[]> {
    return this.personRepository.find({ 
      // @ts-ignore
      fullName: { $regex: searchString, $options: 'i' },
      personType: PersonType.EMPLOYEE,
    })
  }

  update(id: string, updatePersonInput: UpdatePersonInput): Promise<Person> {
    try {
      let p: Person = new Person()
      p.id = id
      p.userId = updatePersonInput.userId? updatePersonInput.userId : null
      p.personType = updatePersonInput.personType? updatePersonInput.personType : null
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