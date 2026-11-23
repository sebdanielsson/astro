// Boolean attributes that React only renders when the prop is truthy. HTML parsers give an
// attribute written without a value as `''`, which React would treat as `false` and drop.
// See: https://github.com/withastro/astro/issues/18812
const BOOLEAN_ATTRIBUTES = new Set([
	'async',
	'checked',
	'controls',
	'default',
	'defer',
	'disabled',
	'hidden',
	'loop',
	'multiple',
	'muted',
	'open',
	'required',
	'reversed',
	'selected',
]);

/**
 * Converts an HTML attribute to the React prop with the same meaning: boolean attributes become
 * `true`, and `value` and `checked` on `<input>` become `defaultValue` and `defaultChecked`, so that
 * React leaves the field uncontrolled as in plain HTML.
 */
export function htmlAttributeToProp(
	tagName: string,
	name: string,
	value: string,
): [name: string, value: string | boolean] {
	const lowerName = name.toLowerCase();
	if (tagName.toLowerCase() === 'input') {
		if (lowerName === 'value') return ['defaultValue', value];
		if (lowerName === 'checked') return ['defaultChecked', true];
	}
	if (BOOLEAN_ATTRIBUTES.has(lowerName)) return [lowerName, true];
	return [name, value];
}
