import { AlertState } from "src/interfaces/IAlertState";
import { CreateAlertInput } from "../dto/create-alert.input";
import { Alert } from "../entities/alert.entity";
import { UpdateAlertInput } from "../dto/update-alert.input";


export const createAlertInputStub = (): CreateAlertInput => {
    const createAlertInput = new CreateAlertInput()
    createAlertInput.title = 'Alert title'
    createAlertInput.description = 'Alert description'
    createAlertInput.createdBy = '6523c13a5abc7f17748bd6b9'
    return createAlertInput
}

export const updateAlertInputStub = () => {
    const updateAlertInput = new UpdateAlertInput()
    updateAlertInput.id = '6526a80bdc62ef69ffc7fde7'
    updateAlertInput.state = AlertState.ACKNOWLEDGED
    updateAlertInput.assignedPersonId = '6523c13a5abc7f17748bd6b9'
    return updateAlertInput
}

export const alertStub = () => {
    const alert = new Alert()
    alert.id = '6526a80bdc62ef69ffc7fde7'
    alert.title = 'Alert title'
    alert.description = 'Alert description'
    alert.state = AlertState.OPEN
    alert.createdBy = '6523c13a5abc7f17748bd6b9'
    alert.createdAt = new Date()
    alert.updatedAt = new Date()
}