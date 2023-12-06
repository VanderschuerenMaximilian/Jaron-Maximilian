import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PersonsService } from './persons.service';
import { Person } from './entities/person.entity';
import { CreatePersonInput } from './dto/create-person.input';
import { UpdatePersonInput, UpdateNavContainerStateInput } from './dto/update-person.input';
import { UseGuards } from '@nestjs/common';
import { FirebaseGuard } from 'src/authentication/services/guards/firebase.guard';
import { FirebaseUser } from 'src/authentication/decorators/user.decorator';
import { UserRecord } from 'firebase-admin/auth';
import { PersonType } from 'src/interfaces/IPersonType';
import { JobType } from 'src/interfaces/IJobType';
import { PersonTypeGuard } from './guards/personType.guard';
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
  @UseGuards(FirebaseGuard, PersonTypeGuard)
  @Query(() => [Person], { name: 'persons' })
  getPersons() {
    return this.personsService.findAll();
  }

  @UseGuards(FirebaseGuard)
  @Query(() => Person, { name: 'personById', nullable: true })
  findOne(@Args('string', { type: () => String}) id: string): Promise<Person> {
    return this.personsService.findOneById(id);
  }

  @UseGuards(FirebaseGuard)
  @Query(() => Person, { name: 'personByUid', nullable: true })
  findOneByUid(@Args('uid', { type: () => String}) uid: string): Promise<Person> {
    return this.personsService.findOneByUid(uid);
  }

  @AllowedPersonTypes(PersonType.MANAGER, PersonType.ADMIN)
  @UseGuards(FirebaseGuard, PersonTypeGuard)
  @Query(() => [Person], { name: 'personsByPersonType', nullable: true })
  findByPersonType(@Args('personType', { type: () => String }) personType: PersonType) {
    return this.personsService.findByPersonType(personType);
  }

  @AllowedPersonTypes(PersonType.ADMIN, PersonType.MANAGER)
  @UseGuards(FirebaseGuard, PersonTypeGuard)
  @Query(() => [Person], { name: 'personsByJobType', nullable: true })
  findByJobType(@Args('jobType', { type: () => String }) jobType: JobType) {
    return this.personsService.findByJobType(jobType);
  }

  @AllowedPersonTypes(PersonType.ADMIN, PersonType.MANAGER)
  @UseGuards(FirebaseGuard, PersonTypeGuard)
  @Query(() => [Person], { name: 'personsBySearchString', nullable: true })
  findBySearchString(@Args('searchString', { type: () => String }) searchString: string) {
    return this.personsService.findBySearchString(searchString);
  }

  @UseGuards(FirebaseGuard)
  @Mutation(() => Person)
  updatePerson(@Args('updatePersonInput') updatePersonInput: UpdatePersonInput) {
    return this.personsService.update(updatePersonInput.id, updatePersonInput);
  }

  @AllowedPersonTypes(PersonType.ADMIN, PersonType.MANAGER)
  @UseGuards(FirebaseGuard, PersonTypeGuard)
  @Mutation(() => Person)
  updateNavContainerState(@Args('updateNavContainerStateInput') updateNavContainerStateInput: UpdateNavContainerStateInput) {
    return this.personsService.updateNavContainerState(updateNavContainerStateInput.id, updateNavContainerStateInput);
  }

  @UseGuards(FirebaseGuard)
  @Mutation(() => Person)
  updateLocale(@Args('id', { type: () => String }) id: string, @Args('locale', { type: () => String }) locale: string) {
    return this.personsService.updateLocale(id, locale);
  }

  @UseGuards(FirebaseGuard)
  @Mutation(() => Person)
  removePerson(@Args('id', { type: () => String }) id: string) {
    return this.personsService.remove(id);
  }
}
