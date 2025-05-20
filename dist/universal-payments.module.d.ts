import { type DynamicModule } from '@nestjs/common';
import { UnitPayAsyncOptions, UnitPayOptions } from './interfaces';
export declare class UniversalPaymentsModule {
    /**
     * Метод для регистрации модуля с синхронными параметрами.
     * Этот метод используется для конфигурации модуля с заранее заданными параметрами.
     * @param {UniversalPaymentsOptions} options - Настройки для конфигурации.
     * @returns {DynamicModule} Возвращает динамический модуль с необходимыми провайдерами и импортами.
     *
     * @example
     * ```ts
     * UniversalPaymentsModule.forRoot({
     *   shopId: 'your_shop_id',
     *   apiKey: 'your_api_key',
     * });
     * ```
     */
    static forRoot(options: UnitPayOptions): DynamicModule;
    /**
     * Метод для регистрации модуля с асинхронной конфигурацией.
     * Этот метод используется для конфигурации модуля с параметрами, которые будут переданы через фабричную функцию.
     * @param {YookassaAsyncOptions} options - Асинхронные параметры для конфигурации YooKassa.
     * @returns {DynamicModule} Возвращает динамический модуль с необходимыми провайдерами и импортами.
     *
     * @example
     * ```ts
     * UniversalPaymentsModule.forRootAsync({
     *   imports: [ConfigModule],
     *	  useFactory: async (configService: ConfigService) => ({
     *		 shopId: configService.getOrThrow('YOOKASSA_SHOP_ID'),
     *		 apiKey: configService.getOrThrow('YOOKASSA_API_KEY')
     *	  }),
     *	  inject: [ConfigService]
     * });
     * ```
     */
    static forRootAsync(options: UnitPayAsyncOptions): DynamicModule;
}
