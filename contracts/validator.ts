type UniqueProps = {
	table: string;
	column: string;
};

declare module '@ioc:Adonis/Core/Validator' {
	interface Rules {
		unique(props: UniqueProps): Rule;
		cpfIsCnpjIsValid(): Rule;
	}
}
