import { SetMetadata } from "@nestjs/common"
import { PersonType } from "src/interfaces/IPersonType"

export const PERSONTYPES_KEY = 'personTypes'

export const AllowedPersonTypes = (...personTypes: PersonType[]) => 
SetMetadata(PERSONTYPES_KEY, personTypes)