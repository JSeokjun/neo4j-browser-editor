# Neo4j Browser Editor

Neo4j Browser의 포크 프로젝트로, GUI 기반의 그래프 수정 기능을 추가한 버전입니다. Cypher 쿼리 없이 시각적으로 노드와 관계를 생성, 수정, 삭제할 수 있습니다.

> 원본 프로젝트: [neo4j/neo4j-browser](https://github.com/neo4j/neo4j-browser) v2025.6.0 기반

## 주요 기능

### 그래프 편집
- **노드 생성**: 캔버스 빈 영역 우클릭으로 즉시 노드 생성
- **노드 삭제**: 노드 선택 후 링 메뉴의 삭제 버튼 클릭
- **관계 생성**: 노드 선택 후 링 메뉴의 연결 버튼 → 대상 노드 클릭
- **관계 삭제**: 관계 선택 후 우측 패널의 휴지통 아이콘 클릭
- **관계 방향 전환**: 관계 선택 후 우측 패널의 양방향 화살표(&#x2194;) 버튼 클릭
- **관계 재연결**: 관계의 시작/끝 원을 우클릭 → 다른 노드 클릭

### 속성 편집
- **인라인 편집**: 속성 키/값 셀 더블클릭으로 즉시 편집 (Enter 저장, Esc 취소)
- **속성 추가**: 속성 테이블 하단의 키/값 입력 필드 사용
- **속성 삭제**: 각 속성 행의 휴지통 아이콘 클릭
- **라벨 편집**: 노드 선택 후 우측 패널에서 쉼표 구분 라벨 편집
- **관계 타입 편집**: 관계 선택 후 우측 패널에서 타입명 편집

### 다중 선택 & 일괄 삭제
- **Shift+클릭**: 여러 노드/관계를 다중 선택 (토글)
- **일괄 삭제**: 다중 선택 시 우측 패널에 "Delete selected (N)" 버튼 표시

### 변경사항 관리
- **Changes 패널**: 모든 편집은 pending 상태로 추적, 클립보드 아이콘 탭에서 확인
- **일괄 저장**: "Save All"로 모든 변경사항을 단일 트랜잭션으로 DB에 커밋
- **취소**: "Cancel"로 모든 변경 폐기 후 원본 데이터 복원
- **No-op 감지**: 원래 값으로 되돌린 편집은 자동으로 pending 목록에서 제거

### 입력 검증
- 빈 라벨 경고 (노드는 최소 1개 라벨 필요)
- 빈 속성 키 경고
- 중복 속성 키 경고
- 빈 관계 타입 시 `RELATED_TO` 기본값 적용 후 경고

## 프로젝트 구조

```
src/
├── browser/                    # 브라우저 애플리케이션
│   ├── modules/
│   │   ├── Stream/CypherFrame/ # Cypher 결과 프레임 + 시각화
│   │   ├── Sidebar/            # 사이드바 (가이드 포함)
│   │   └── ...
│   └── documentation/          # 빌트인 가이드 (sidebar-guides/)
│
├── neo4j-arc/                  # 재사용 가능 컴포넌트 라이브러리
│   ├── common/                 # 공통 컴포넌트 (PropertiesTable, Icons)
│   ├── graph-visualization/    # D3 기반 그래프 시각화 엔진
│   │   └── GraphVisualizer/
│   │       ├── Graph/          # D3 렌더링, 이벤트 핸들링
│   │       ├── DefaultPanelContent/ # 기본 상세 패널
│   │       └── NodeInspectorPanel   # 노드/관계 검사 패널
│   └── cypher-language-support/    # Cypher 언어 지원
│
└── shared/                     # Redux 상태 관리, 서비스
```

`neo4j-arc`는 독립된 서브프로젝트로, ESLint 규칙으로 격리되어 있습니다. 브라우저 코드에서는 반드시 `neo4j-arc` alias를 통해서만 import 합니다.

## 개발 환경

### 요구사항
- Node.js ^12.4.0
- Yarn (`npm install -g yarn`)

### 설치 및 실행

```shell
yarn install
yarn start
```

개발 서버가 `http://localhost:4542`에서 시작됩니다.

프로덕션 모드:
```shell
yarn start-prod
```

### 테스트

```shell
yarn test-unit       # 린터 + 단위 테스트
yarn test-e2e        # Cypress E2E 테스트 (Docker 필요)
```

Cypress 상세 옵션은 원본 Neo4j Browser 문서를 참조하세요.

## 기술 스택

| 항목 | 기술 |
|------|------|
| 프레임워크 | React 17 (Class Components + Hooks) |
| 타입 시스템 | TypeScript 4.x |
| 상태 관리 | Redux + react-suber |
| 시각화 | D3.js (SVG force simulation) |
| 스타일링 | styled-components |
| 빌드 | Webpack 5 |
| 테스트 | Jest + Cypress |

## 버전

- 베이스: Neo4j Browser v2025.6.0
- 에디터 버전: 3.05.02

## 라이선스

GPL-3.0 (원본 Neo4j Browser 라이선스 계승)
