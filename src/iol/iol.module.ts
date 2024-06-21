import { Module } from "@nestjs/common";
import { HttpModule} from "@nestjs/axios";
import { ConfigModule } from "@nestjs/config";
import { IOLService } from "./iol.service";

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [IOLService],
  exports: [IOLService]
})

export class IOLModule {}