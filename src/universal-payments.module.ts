import { HttpModule } from '@nestjs/axios'
import { type DynamicModule, Global, Module } from '@nestjs/common'
import {
	UnitPayAsyncOptions,
	UnitPayOptions,
	UnitPayOptionsSymbol
} from './interfaces'
import { UniversalPaymentsService } from './universal-payments.service'

@Global()
@Module({})
export class UniversalPaymentsModule {
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
	public static forRoot(options: UnitPayOptions): DynamicModule {
		return {
			module: UniversalPaymentsModule,
			imports: [HttpModule],
			providers: [
				{
					provide: UnitPayOptionsSymbol,
					useValue: options
				},
				UniversalPaymentsService
			],
			exports: [UniversalPaymentsService],
			global: true
		}
	}

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
	public static forRootAsync(options: UnitPayAsyncOptions): DynamicModule {
		return {
			module: UniversalPaymentsModule,
			imports: [HttpModule, ...(options.imports || [])],
			providers: [
				{
					provide: UnitPayOptionsSymbol,
					useFactory: options.useFactory,
					inject: options.inject || []
				},
				UniversalPaymentsService
			],
			exports: [UniversalPaymentsService],
			global: true
		}
	}
}
