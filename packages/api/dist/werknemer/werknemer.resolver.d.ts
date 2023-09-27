import { WerknemerService } from './werknemer.service';
import { Werknemer } from './entities/werknemer.entity';
import { CreateWerknemerInput } from './dto/create-werknemer.input';
import { UpdateWerknemerInput } from './dto/update-werknemer.input';
export declare class WerknemerResolver {
    private readonly werknemerService;
    constructor(werknemerService: WerknemerService);
    createWerknemer(createWerknemerInput: CreateWerknemerInput): Promise<Werknemer>;
    findAll(): Promise<Werknemer[]>;
    findOne(id: number): string;
    updateWerknemer(updateWerknemerInput: UpdateWerknemerInput): string;
    removeWerknemer(id: number): string;
}
