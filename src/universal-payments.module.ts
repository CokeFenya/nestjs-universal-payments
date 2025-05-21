import { HttpModule } from '@nestjs/axios'
import { type DynamicModule, Global, Module } from '@nestjs/common'
import {
	type YookassaAsyncOptions,
	type YookassaOptions,
	YookassaOptionsSymbol
} from './interfaces/yookassa-options.interface'
import { UniversalPayService } from './universal-payments.service'

@Global()
@Module({})
export class UniversalPayModule {
	/**
	 * Метод для регистрации модуля с синхронными параметрами.
	 * Этот метод используется для конфигурации модуля с заранее заданными параметрами.
	 * @param {YookassaOptions} options - Настройки для конфигурации YooKassa.
	 * @returns {DynamicModule} Возвращает динамический модуль с необходимыми провайдерами и импортами.
	 *
	 * @example
	 * ```ts
	 * YookassaModule.forRoot({
	 *   shopId: 'your_shop_id',
	 *   apiKey: 'your_api_key',
	 * });
	 * ```
	 */
	public static forRoot(options: YookassaOptions): DynamicModule {
		return {
			module: UniversalPayModule,
			imports: [HttpModule],
			providers: [
				{
					provide: YookassaOptionsSymbol,
					useValue: options
				},
				UniversalPayService
			],
			exports: [UniversalPayService],
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
	 * YookassaModule.forRootAsync({
	 *   imports: [ConfigModule],
	 *	  useFactory: async (configService: ConfigService) => ({
	 *		 shopId: configService.getOrThrow('YOOKASSA_SHOP_ID'),
	 *		 apiKey: configService.getOrThrow('YOOKASSA_API_KEY')
	 *	  }),
	 *	  inject: [ConfigService]
	 * });
	 * ```
	 */
	public static forRootAsync(options: YookassaAsyncOptions): DynamicModule {
		return {
			module: UniversalPayModule,
			imports: [HttpModule, ...(options.imports || [])],
			providers: [
				{
					provide: YookassaOptionsSymbol,
					useFactory: options.useFactory,
					inject: options.inject || []
				},
				UniversalPayService
			],
			exports: [UniversalPayService],
			global: true
		}
	}
}
