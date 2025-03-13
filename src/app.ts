import { AppRoutes } from '@/routes/routes';
import { Server } from '@/server';
import { seed } from '@/seed';

export async function main() {
    new Server({
        port: process.env.PORT!,
        routes: AppRoutes.routes
    }).start();

    await seed();
}

(() => {
    main()
})()