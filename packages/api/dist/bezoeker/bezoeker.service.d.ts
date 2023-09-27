import { CreateBezoekerInput } from './dto/create-bezoeker.input';
import { UpdateBezoekerInput } from './dto/update-bezoeker.input';
import { Bezoeker } from './entities/bezoeker.entity';
import { Repository } from 'typeorm';
export declare class BezoekerService {
    private readonly bezoekerRepository;
    constructor(bezoekerRepository: Repository<Bezoeker>);
    create(createBezoekerInput: CreateBezoekerInput): Promise<Bezoeker>;
    findAll(): Promise<Bezoeker[]>;
    findOne(id: number): string;
    update(id: number, updateBezoekerInput: UpdateBezoekerInput): string;
    remove(id: number): string;
    save(bezoeker: Bezoeker[]): Promise<Bezoeker[]>;
    truncate(): Promise<void>;
}
