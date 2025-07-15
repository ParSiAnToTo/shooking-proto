import { fetchData } from './callback';

describe('fetchData – 의도적 FAIL', () => {

    beforeEach(() => {
        console.log('fetchData 테스트 전 - 콜백 준비');
    });

    afterEach(() => {
        console.log('fetchData 테스트 후 - 콜백 정리');
    });

    test('FAIL 예상', (done) => {
        expect.assertions(1); // expect 실행 강제 
        fetchData((data) => {
        expect(data).toBe('jest testing...');      
        });
    });
});

describe('fetchData – PASS', () => {
    test('done 콜백 사용 → PASS', (done) => {
        fetchData((data) => {
            expect(data).toBe('jest testing...');
            done();
        });
    });
});