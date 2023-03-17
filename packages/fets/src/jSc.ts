import { JSONSchema } from './types';

type RequiredPropertyKeys<TProperties extends Record<string, JSONSchema>> = {
  [K in keyof TProperties]: TProperties[K] extends { ['__optional']: true } ? never : K;
}[keyof TProperties];

const sharedHelpers = {
  $format<TThis extends JSONSchema, TFormat extends string>(
    this: TThis,
    format: TFormat,
  ): Omit<TThis, 'format'> & { ['format']: TFormat } {
    return {
      ...this,
      format,
    } as const;
  },
  $enum<TThis extends JSONSchema, TEnums extends string[]>(
    this: TThis,
    ..._enum: TEnums
  ): Omit<TThis, 'enum'> & { enum: TEnums } {
    return {
      ...this,
      enum: _enum,
    } as const;
  },
  $nullable<TThis extends JSONSchema, TNullable extends boolean = true>(
    this: TThis,
    nullable: TNullable = true as TNullable,
  ): Omit<TThis, 'nullable'> & { ['nullable']: TNullable } {
    return {
      ...this,
      nullable,
    } as const;
  },
  $optional<TThis extends JSONSchema, TOptional extends boolean = true>(
    this: TThis,
    __optional: TOptional = true as TOptional,
  ): Omit<TThis, '__optional'> & { ['__optional']: TOptional } {
    return {
      ...this,
      __optional,
    } as const;
  },
  $not<TThis extends JSONSchema, TNot extends JSONSchema>(
    this: TThis,
    not: TNot,
  ): Omit<TThis, 'not'> & { ['not']: TNot } {
    return {
      ...this,
      not,
    } as const;
  },
} as const;

export const jSc = {
  $string() {
    return {
      type: 'string',
      $maxLength<TThis extends JSONSchema, TMaxLength extends number>(
        this: TThis,
        maxLength: TMaxLength,
      ): Omit<TThis, 'maxLength'> & { ['maxLength']: TMaxLength } {
        return {
          ...this,
          maxLength,
        } as const;
      },
      $minLength<TThis extends JSONSchema, TMinLength extends number>(
        this: TThis,
        minLength: TMinLength,
      ): Omit<TThis, 'minLength'> & { ['minLength']: TMinLength } {
        return {
          ...this,
          minLength,
        } as const;
      },
      $length<TThis extends JSONSchema, TLength extends number>(
        this: TThis,
        length: TLength,
      ): Omit<TThis, 'minLength' | 'maxLength'> & {
        ['minLength']: TLength;
        ['maxLength']: TLength;
      } {
        return {
          ...this,
          minLength: length,
          maxLength: length,
        } as const;
      },
      $pattern<TPattern extends string>(pattern: TPattern) {
        return {
          ...this,
          pattern,
        } as const;
      },
      ...sharedHelpers,
    } as const;
  },
  $number() {
    return {
      type: 'number',
      $min<TMin extends number>(min: TMin) {
        return {
          ...this,
          minimum: min,
        } as const;
      },
      $max<TMax extends number>(max: TMax) {
        return {
          ...this,
          maximum: max,
        } as const;
      },
      ...sharedHelpers,
    } as const;
  },
  $boolean() {
    return {
      type: 'boolean',
      ...sharedHelpers,
    } as const;
  },
  $null() {
    return {
      type: 'null',
      ...sharedHelpers,
    } as const;
  },
  $object<TProperties extends Record<string, JSONSchema>>(properties: TProperties) {
    const required = [] as RequiredPropertyKeys<TProperties>[];
    for (const key in properties) {
      if ((properties[key] as any).__optional) {
        continue;
      }
      required.push(key as unknown as RequiredPropertyKeys<TProperties>);
    }
    return {
      type: 'object',
      properties,
      additionalProperties: false,
      required,
      $additionalProperties<TThis extends JSONSchema, TAdditionalProperties extends JSONSchema>(
        this: TThis,
        additionalProperties: TAdditionalProperties,
      ): Omit<TThis, 'additionalProperties'> & { ['additionalProperties']: TAdditionalProperties } {
        return {
          ...this,
          additionalProperties,
        } as const;
      },
      ...sharedHelpers,
    } as const;
  },
  $array<TItems extends JSONSchema>(items: TItems) {
    return {
      type: 'array',
      items,
      $minItems<TThis extends JSONSchema, TMinItems extends number>(
        this: TThis,
        minItems: TMinItems,
      ): Omit<TThis, 'minItems'> & { ['minItems']: TMinItems } {
        return {
          ...this,
          minItems,
        } as const;
      },
      $maxItems<TThis extends JSONSchema, TMaxItems extends number>(
        this: TThis,
        maxItems: TMaxItems,
      ): Omit<TThis, 'maxItems'> & { ['maxItems']: TMaxItems } {
        return {
          ...this,
          maxItems,
        } as const;
      },
      $itemsLength<TThis extends JSONSchema, TItemsLength extends number>(
        this: TThis,
        itemsLength: TItemsLength,
      ): Omit<TThis, 'minItems' | 'maxItems'> & {
        ['minItems']: TItemsLength;
        ['maxItems']: TItemsLength;
      } {
        return {
          ...this,
          minItems: itemsLength,
          maxItems: itemsLength,
        } as const;
      },
      ...sharedHelpers,
    } as const;
  },
  $oneOf<TOneOf extends JSONSchema[]>(...oneOf: TOneOf) {
    return {
      oneOf,
    } as const;
  },
  $anyOf<TAnyOf extends JSONSchema[]>(...anyOf: TAnyOf) {
    return {
      anyOf,
    } as const;
  },
  $allOf<TAllOf extends JSONSchema[]>(...allOf: TAllOf) {
    return {
      allOf,
    } as const;
  },
};
