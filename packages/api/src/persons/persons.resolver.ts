import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PersonsService } from './persons.service';
import { Person } from './entities/person.entity';
import { CreatePersonInput } from './dto/create-person.input';
import { UpdatePersonInput } from './dto/update-person.input';
import { UseGuards } from '@nestjs/common';
import { FirebaseGuard } from 'src/authentication/services/guards/firebase.guard';
import { FirebaseUser } from 'src/authentication/decorators/user.decorator';
import { UserRecord } from 'firebase-admin/auth';
import { PersonType } from 'src/interfaces/IPersonType';
import { RolesGuard } from './guards/personType.guard';
import { AllowedPersonTypes } from './decorators/personType.decorator';

@Resolver(() => Person)
export class PersonsResolver {
  constructor(private readonly personsService: PersonsService) {}

  @UseGuards(FirebaseGuard)
  @Mutation(() => Person)
  createPerson(@Args('createPersonInput') createPersonInput: CreatePersonInput,
  @FirebaseUser() currentUser: UserRecord
  ) {
    return this.personsService.create(currentUser.uid, createPersonInput);
  }

  @AllowedPersonTypes(PersonType.ADMIN)
  @UseGuards(FirebaseGuard, RolesGuard)
  @Query(() => [Person], { name: 'persons' })
  getPersons(@FirebaseUser() currentUser: UserRecord) {
    return this.personsService.findAll();
  }

  @UseGuards(FirebaseGuard)
  @Query(() => Person, { name: 'personById', nullable: true })
  findOne(@Args('string', { type: () => String}) id: string): Promise<Person> {
    return this.personsService.findOneById(id);
  }

  @UseGuards(FirebaseGuard)
  @Query(() => [Person], { name: 'personsByPersonType', nullable: true })
  findByPersonType(@Args('personType', { type: () => String }) personType: PersonType) {
    return this.personsService.findByPersonType(personType);
  }

  @UseGuards(FirebaseGuard)
  @Query(() => [Person], { name: 'personsBySearchString', nullable: true })
  findBySearchString(@Args('searchString', { type: () => String }) searchString: string) {
    return this.personsService.findBySearchString(searchString);
  }

  @Mutation(() => Person)
  updatePerson(@Args('updatePersonInput') updatePersonInput: UpdatePersonInput) {
    return this.personsService.update(updatePersonInput.id, updatePersonInput);
  }

  @Mutation(() => Person)
  removePerson(@Args('id', { type: () => String }) id: string) {
    return this.personsService.remove(id);
  }
}
