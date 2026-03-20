import type { CstNode, ICstVisitor, IToken } from 'chevrotain';

export interface StructSpecificationCstNode extends CstNode {
	name: 'structSpecification';
	children: StructSpecificationCstChildren;
}

export type StructSpecificationCstChildren = {
	declaration?: DeclarationCstNode[];
	Semicolon?: IToken[];
};

export interface DeclarationCstNode extends CstNode {
	name: 'declaration';
	children: DeclarationCstChildren;
}

export type DeclarationCstChildren = {
	enumSpecification?: EnumSpecificationCstNode[];
	optionalWhitespace: OptionalWhitespaceCstNode[];
	Identifier: IToken[];
	bitFieldDeclaration?: BitFieldDeclarationCstNode[];
	standardDeclarationArray?: StandardDeclarationArrayCstNode[];
};

export interface StandardDeclarationArrayCstNode extends CstNode {
	name: 'standardDeclarationArray';
	children: StandardDeclarationArrayCstChildren;
}

export type StandardDeclarationArrayCstChildren = {
	optionalWhitespace: OptionalWhitespaceCstNode[];
	arraySize: ArraySizeCstNode[];
};

export interface BitFieldDeclarationCstNode extends CstNode {
	name: 'bitFieldDeclaration';
	children: BitFieldDeclarationCstChildren;
}

export type BitFieldDeclarationCstChildren = {
	optionalWhitespace: OptionalWhitespaceCstNode[];
	Colon: IToken[];
	Integer: IToken[];
};

export interface ArraySizeCstNode extends CstNode {
	name: 'arraySize';
	children: ArraySizeCstChildren;
}

export type ArraySizeCstChildren = {
	LeftSquareBrace: IToken[];
	optionalWhitespace: OptionalWhitespaceCstNode[];
	Integer: IToken[];
	RightSquareBrace: IToken[];
};

export interface EnumSpecificationCstNode extends CstNode {
	name: 'enumSpecification';
	children: EnumSpecificationCstChildren;
}

export type EnumSpecificationCstChildren = {
	EnumKeyword?: IToken[];
	optionalWhitespace: OptionalWhitespaceCstNode[];
	LeftCurlyBrace: IToken[];
	enumMember?: EnumMemberCstNode[];
	Comma?: IToken[];
	RightCurlyBrace: IToken[];
};

export interface EnumMemberCstNode extends CstNode {
	name: 'enumMember';
	children: EnumMemberCstChildren;
}

export type EnumMemberCstChildren = {
	optionalWhitespace: OptionalWhitespaceCstNode[];
	Identifier: IToken[];
	Equals: IToken[];
	Integer: IToken[];
};

export interface OptionalWhitespaceCstNode extends CstNode {
	name: 'optionalWhitespace';
	children: OptionalWhitespaceCstChildren;
}

export type OptionalWhitespaceCstChildren = {
	WhiteSpace?: IToken[];
};

export interface ICstNodeVisitor<IN, OUT> extends ICstVisitor<IN, OUT> {
	structSpecification(children: StructSpecificationCstChildren, param?: IN): OUT;
	declaration(children: DeclarationCstChildren, param?: IN): OUT;
	standardDeclarationArray(children: StandardDeclarationArrayCstChildren, param?: IN): OUT;
	bitFieldDeclaration(children: BitFieldDeclarationCstChildren, param?: IN): OUT;
	arraySize(children: ArraySizeCstChildren, param?: IN): OUT;
	enumSpecification(children: EnumSpecificationCstChildren, param?: IN): OUT;
	enumMember(children: EnumMemberCstChildren, param?: IN): OUT;
	optionalWhitespace(children: OptionalWhitespaceCstChildren, param?: IN): OUT;
}
