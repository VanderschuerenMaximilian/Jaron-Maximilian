import { ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class FirebaseGuard extends AuthGuard('firebase-auth') {
  getRequest(context: ExecutionContext) {
    // Here we only pass the context the important code is in firebase.strategy.ts 
    const ctx = GqlExecutionContext.create(context)
    return ctx.getContext().req
  }
}