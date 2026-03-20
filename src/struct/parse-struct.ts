import { lexer } from './lexer.js';
import { parser } from './parser.js';
import type { StructDeclaration } from './types.js';
import { StructAstVisitor } from './struct-ast-visitor.js';

const structAstVisitor = new StructAstVisitor();

const cache = new Map<string, StructDeclaration[]>();

/** Parse a WPILib struct specification string into declarations. */
export function parseStructSpecification(declaration: string): StructDeclaration[] {
	const existing = cache.get(declaration);

	if (existing) {
		return existing;
	}

	const lexingResult = lexer.tokenize(declaration);

	if (lexingResult.errors.length > 0) {
		throw new AggregateError(lexingResult.errors, 'Failed to lex struct specification');
	}

	parser.input = lexingResult.tokens;

	const cstNode = parser.structSpecification();

	if (parser.errors.length > 0) {
		throw new AggregateError(parser.errors, 'Failed to parse struct specification');
	}

	const created = structAstVisitor.structSpecification(cstNode.children);
	cache.set(declaration, created);
	return created;
}
