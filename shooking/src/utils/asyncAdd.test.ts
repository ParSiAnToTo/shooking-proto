import { asyncAdd } from './asyncAdd';

describe('asyncAdd – 의도적 FAIL', () => {
    
    beforeAll(() => {
    console.log('⏳ asyncAdd 테스트 전체 전처리');
    });

    afterAll(() => {
    console.log('✅ asyncAdd 테스트 전체 후처리');
    });

    test('return/await 누락 → FAIL 예상', () => {
        expect.assertions(1);  // expect 실행 강제 
        expect(asyncAdd(1, 2)).resolves.toBe(3);
    });
});

describe('asyncAdd – PASS', () => {
    test('return으로 Promise 반환 → PASS', () => {
        return expect(asyncAdd(2, 3)).resolves.toBe(5);
    });

    test('async/await → PASS', async () => {
        const result = await asyncAdd(3, 4);
        expect(result).toBe(7);
    });
});