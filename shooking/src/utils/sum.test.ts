import { sum } from './sum';

describe('sum function test', () => {
    beforeAll(() => {
        console.log('sum 테스트 전체 전처리');
    });

    afterAll(() => {
        console.log('sum 테스트 전체 후처리');
    });

    beforeEach(() => {
        console.log('sum 개별 테스트 준비');
    });

    afterEach(() => {
        console.log('sum 개별 테스트 완료');
    });

    test('자연수 덧셈', () => {
        expect(sum(1, 2)).toBe(3);
    });
    test('소수 덧셈', () => {
        expect(sum(1.5, 2.3)).toBeCloseTo(3.8);
    });
    test('큰 수 덧셈', () => {
        expect(sum(1_000_000, 2_000_000)).toBe(3_000_000);
    });
})