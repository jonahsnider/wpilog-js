import { Lexer, createToken } from 'chevrotain';

export const Comma = createToken({ name: 'Comma', pattern: ',' });
export const Semicolon = createToken({ name: 'Semicolon', pattern: ';' });
export const Colon = createToken({ name: 'Colon', pattern: ':' });
export const Equals = createToken({ name: 'Equals', pattern: '=' });
export const WhiteSpace = createToken({ name: 'WhiteSpace', pattern: /\s+/ });
export const Integer = createToken({ name: 'Integer', pattern: /0|[1-9]\d*/ });

export const LeftSquareBrace = createToken({ name: 'LeftSquareBrace', pattern: '[' });
export const RightSquareBrace = createToken({ name: 'RightSquareBrace', pattern: ']' });

export const EnumKeyword = createToken({ name: 'EnumKeyword', pattern: 'enum' });
export const LeftCurlyBrace = createToken({ name: 'LeftCurlyBrace', pattern: '{' });
export const RightCurlyBrace = createToken({ name: 'RightCurlyBrace', pattern: '}' });

export const Identifier = createToken({ name: 'Identifier', pattern: /\w+/ });

export const allTokens = [
	WhiteSpace,
	Semicolon,
	Equals,
	Comma,
	Colon,
	Integer,

	LeftSquareBrace,
	RightSquareBrace,

	EnumKeyword,
	LeftCurlyBrace,
	RightCurlyBrace,

	Identifier,
];

export const lexer = new Lexer(allTokens);
