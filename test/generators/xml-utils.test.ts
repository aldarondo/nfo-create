import { describe, it, expect } from 'vitest';
import { escapeXml, elem, XML_HEADER } from '../../src/generators/xml-utils.js';

describe('xml-utils', () => {
    describe('escapeXml', () => {
        it('should escape all standard XML special characters', () => {
            expect(escapeXml('Mac & Cheese')).toBe('Mac &amp; Cheese');
            expect(escapeXml('<tag>')).toBe('&lt;tag&gt;');
            expect(escapeXml('"Quotes"')).toBe('&quot;Quotes&quot;');
            expect(escapeXml("'Apos'")).toBe('&apos;Apos&apos;');
        });

        it('should strip out invalid XML control characters', () => {
            expect(escapeXml('Hello\x00World\x08!')).toBe('HelloWorld!');
            expect(escapeXml('Hello\nWorld\t!')).toBe('Hello\nWorld\t!'); // valid characters kept
        });
    });

    describe('elem', () => {
        it('should wrap value in specified tag with indent', () => {
            expect(elem('title', 'My Title')).toBe('  <title>My Title</title>\n');
            expect(elem('year', 2024, '    ')).toBe('    <year>2024</year>\n');
        });

        it('should return empty string if value is null, undefined, empty string, or NaN', () => {
            expect(elem('title', null)).toBe('');
            expect(elem('title', undefined)).toBe('');
            expect(elem('title', '')).toBe('');
            expect(elem('year', NaN)).toBe('');
        });

        it('should safely escape value inside tag', () => {
            expect(elem('plot', 'R & B < > " \'')).toBe('  <plot>R &amp; B &lt; &gt; &quot; &apos;</plot>\n');
        });
    });

    describe('XML_HEADER', () => {
        it('should be the standard XML 1.0 UTF-8 header', () => {
            expect(XML_HEADER).toBe('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n');
        });
    });
});
