import { CreateWerknemerInput } from './dto/create-werknemer.input';
import { UpdateWerknemerInput } from './dto/update-werknemer.input';
import { Werknemer } from './entities/werknemer.entity';
import { Repository } from 'typeorm';
export declare class WerknemerService {
    private werknemerRepository;
    constructor(werknemerRepository: Repository<Werknemer>);
    create(createWerknemerInput: CreateWerknemerInput): Promise<Werknemer>;
    findAll(): Promise<Werknemer[]>;
    findOne(id: number): string;
    update(id: number, updateWerknemerInput: UpdateWerknemerInput): string;
    remove(id: number): string;
    saveAll(werknemers: Werknemer[]): Promise<Werknemer[]>;
    truncate(): Promise<void>;
}
