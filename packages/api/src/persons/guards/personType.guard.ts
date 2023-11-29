import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { PersonsService } from '../persons.service';
import { Reflector } from '@nestjs/core';
import { PersonType as IPersonType } from 'src/interfaces/IPersonType';
import { GqlExecutionContext } from '@nestjs/graphql';
import { PERSONTYPES_KEY } from '../decorators/personType.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private readonly personsService: PersonsService,
    ) {

    }
    
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<IPersonType[]>
        (PERSONTYPES_KEY, [
            context.getHandler(),
            context.getClass(),
        ])

        if (!requiredRoles) throw new Error('No roles defined')

        const ctx = GqlExecutionContext.create(context)
        const { user } = ctx.getContext().req // This works because we already made guards
        const { personType } = await this.personsService.findOneByUid(user.uid)

        return requiredRoles.includes(personType)
    }
}