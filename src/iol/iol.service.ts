import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import {lastValueFrom } from "rxjs";
import * as process from "node:process";

@Injectable()
export class IOLService {
    private token: string | null = null;

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService
    ) {}

    async authenticate(): Promise<void> {
        const username = process.env.IOL_USERNAME;
        const password = process.env.IOL_PASSWORD;

        const response = await lastValueFrom(
            this.httpService.post('https://api.invertironline.com/token', {
                username,
                password,
                grant_type: 'password',
            })
        );

        this.token = response.data.access_token;
    }

    async getToken(): Promise<string> {
        if (!this.token) {
            await this.authenticate();
        }
        return this.token;
    }

    async getPrecioActual(ticker: string): Promise<number> {
        const token = await this.getToken();
        const url = `https://api.invertironline.com/api/v2/bCBA/Titulos/${ticker}/Cotizacion`;
        const response = await lastValueFrom(this.httpService.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }));
        return response.data.ultimoPrecio;
    }
}

