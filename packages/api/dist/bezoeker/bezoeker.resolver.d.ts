import { BezoekerService } from './bezoeker.service';
import { Bezoeker } from './entities/bezoeker.entity';
import { CreateBezoekerInput } from './dto/create-bezoeker.input';
import { UpdateBezoekerInput } from './dto/update-bezoeker.input';
export declare class BezoekerResolver {
    private readonly bezoekerService;
    constructor(bezoekerService: BezoekerService);
    createBezoeker(createBezoekerInput: CreateBezoekerInput): Promise<Bezoeker>;
    getBirds(): Promise<Bezoeker[]>;
    findOne(id: number): string;
    updateBezoeker(updateBezoekerInput: UpdateBezoekerInput): string;
    removeBezoeker(id: number): string;
}
