import { parser } from './parser.js';

export const BaseStructVisitor = parser.getBaseCstVisitorConstructor<unknown, unknown>();
export const BaseStructVisitorWithDefaults = parser.getBaseCstVisitorConstructorWithDefaults<unknown, unknown>();
