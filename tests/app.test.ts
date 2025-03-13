import { main } from "../src/app";
import { Server } from '../src/server';
import { AppRoutes } from '../src/routes/routes';

// Mock del módulo Server
jest.mock('@/server', () => ({
    Server: jest.fn().mockImplementation(() => ({
        start: jest.fn(),
    })),
}));

// Mock del módulo AppRoutes
jest.mock('@/routes/routes', () => ({
    AppRoutes: {
        routes: [
            { path: '/', method: 'GET', handler: jest.fn() },
        ],
    },
}));

describe('app.ts', () => {
    beforeEach(() => {
        // Limpiar mocks antes de cada prueba
        jest.clearAllMocks();
    });

    test('main debería inicializar el servidor con las rutas y el puerto correctos', async () => {
        // Configurar el puerto en process.env
        process.env.PORT = '3000';

        // Llamar a la función main
        await main();

        // Verificar que el servidor se inicializó correctamente
        expect(Server).toHaveBeenCalledTimes(1);
        expect(Server).toHaveBeenCalledWith({
            port: '3000',
            routes: AppRoutes.routes,
        });
    });
});