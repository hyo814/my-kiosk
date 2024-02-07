## Payhere Front-end 채용 과제

### 프로젝트 개요
이 프로젝트는 Payhere의 Front-end 개발자 채용 과정의 일환으로 제작되었습니다.
사용자가 제품을 선택하고, 할인 쿠폰을 적용한 뒤 결제할 수 있는 웹 페이지를 구현하는 것이 목적입니다.

(["homepage"]: "https://thriving-souffle-725d1a.netlify.app/")

### 필요 소프트웨어
- Node.js (버전 14 이상 권장)
- npm (Node.js에 포함되어 있음)
- React
- Material-ui
- Recoil
- axios
- TypeScript

### 설치 및 실행
- 프로젝트를 클론합니다.
  ```
  $ git clone "https://github.com/hyo814/my-kiosk"
  ```

- 필요한 의존성을 설치합니다.
   ```
     $ npm install
   ```

- 개발 서버를 시작합니다.
    ```
     $ npm run start
     ```
- 개발 배포를 시작합니다.
   ```
      $ npm run build
   ```

- 브라우저에서 http://localhost:3000을 열어 프로젝트를 확인합니다.

### 사용된 기술 및 라이브러리 / 이유
가. SPA (Single Page Application) 구조를 사용하는 주된 이유 중 하나는 웹 애플리케이션의 사용자 경험을 데스크탑 애플리케이션과 유사하게 만드는 것
입니다. SPA는 웹 페이지를 새로 고침하지 않고도 사용자와 동적으로 상호 작용하며, 필요한 데이터만 서버에서 가져와서 로컬에서 처리합니다. 
이로 인해 애플리케이션이 더 빠르고 반응이 좋아지며, 사용자는 부드러운 전환과 즉각적인 피드백을 경험할 수 있습니다.

- React를 사용한 이유는 다음과 같습니다:
1. 컴포넌트 기반 아키텍처: React는 재사용 가능한 컴포넌트를 만들어 애플리케이션의 각 부분을 독립적으로 관리할 수 있게 해줍니다.
2. 강력한 생태계 및 커뮤니티 지원: React는 방대한 생태계를 가지고 있어서 필요한 자료를 찾거나, 새로운 기능을 추가할 때 풍부한 라이브러리
와 도구를 사용하여 완성을 할 수 있었습니다.
3. 가상 DOM: React는 가상 DOM을 사용하여 실제 DOM의 변경을 최소화합니다.

- Next.js를 사용하지 않은 이유는 다음과 같습니다:
1. SEO 요구 사항: Next.js는 서버 사이드 렌더링(SSR)을 지원하여 SEO 최적화에 유리하지만, 
프로젝트의 특성 상 SEO가 주된 초점이 아니라면 SPA 방식을 선택할 수 있다고 생각합니다.
2. 프로젝트의 성격: 정해진 대상에게 제공되는 서비스이고, 검색 엔진을 통한 유입보다는 
사용자 경험에 더 중점을 두고 있다면, React를 사용하는 SPA가 더 좋을 것으로 기대됩니다.

나. css module
CSS Modules는 CSS 클래스 이름과 선택자를 로컬 스코프로 한정하여, 다른 파일의 클래스 이름과 충돌을 방지하는 기술입니다.
1. 로컬 스코프(Local Scoping): CSS Modules는 기본적으로 스타일을 모듈별로 캡슐화하여 클래스 이름 충돌을 방지합니다.
2. 명시적 종속성(Explicit Dependencies): CSS Modules는 JavaScript에서 CSS를 import하여 사용하기 때문에, 스타일과 컴포넌트 간의 종속성이 명확해집니다.
3. 재사용성(Reusability): 컴포넌트 및 해당 스타일을 쉽게 재사용할 수 있습니다.
4. 유지 보수성(Maintainability): CSS Modules를 사용하면 스타일이 분산되지 않고, 각 컴포넌트에 집중되어 있어, 스타일 관련 코드를 쉽게 찾고, 업데이트하며, 유지보수할 수 있습니다.
5. 작성 편의성(Ease of Writing): 긴 클래스 이름을 고민하지 않아도 되며, 클래스 이름을 짧고 간결하게 유지할 수 있습니다.

### 프로젝트 파일 구조
```
├── src                // 소스 코드 폴더
│   ├── component      // 컴포넌트 폴더
│   │   ├── CartItemAdjustment // 쿠폰 할인 목록 5번 해당
│   │   │   └── CartItemAdjustment.tsx
│   │   ├── CategoryHeader // 카테고리 메뉴 1번
│   │   │   └── CategoryHeader.tsx
│   │   ├── CheckoutList // 할인과 계산이 되는 리스트 목록 5번
│   │   │   └── CheckoutList.tsx
│   │   ├── PaymentModal // 결제 화면 모달 창 6번 - 1
│   │   │   ├── CouponPayPaper.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── PayPaper.tsx
│   │   │   └── Specification.tsx
│   │   ├── PaymentSummary // 총 결제 6번
│   │   │   └── PaymentSummary.tsx
│   │   ├── ProductControls // 할인을 하거나 추가 계산을 하기 위함 3번과 4번
│   │   │   ├── CountManager.tsx
│   │   │   ├── CouponButton.tsx
│   │   │   └── ProductControls.tsx
│   │   └── ProductList // 카테고리 선택 후 product 2번
│   │       └── ProductList.tsx
│   ├── type            // 타입 정의 폴더
│   │   ├── Category.ts
│   │   ├── Coupon.ts
│   │   ├── Option.ts
│   │   └── Products.ts
│   ├── Utils           // 유틸리티 함수 폴더
│   │   └── utils.ts
│   ├── mock            // 목 데이터 폴더
│   │   └── rest
│   │       ├── common.js
│   │       └── index.js
│   └── state           // 상태 관리 폴더
│       └── atoms.ts
├── App.module.css
├── App.test.tsx
├── App.tsx
├── index.css
└── index.tsx
```

### 요구사항
1. 화면 상단 - 카테고리 정보 (CategoryHeader)
화면 상단 "카테고리 정보" 섹션에 적절한 내용을 보여주세요. 

2. 카테고리 내 제품 정보 (ProductList)
선택된 카테고리 내 제품 정보를 보여주세요.
제품 정보는 `/products` API 호출을 통해 확인하실 수 있습니다.
카테고리에서 선택한 아이템의 'categoryId'를 사용하여 제품 정보를 가져올 수 있습니다.
제품을 클릭하는 경우, <5번 - 결제할 제품 목록>에 추가될 수 있어야 합니다.
제품 중에는 "옵션"을 가지고 있는 경우가 있어요. "옵션"이 있는 경우, 선택할 수 있는 UI가 표시될 수 있어야 합니다.

3. 할인 (ProductControls > CouponButton)
결제할 금액을 할인 받을 수 있는 쿠폰을 제공하고 있어요.
쿠폰 정보는 `/coupons` API 호출을 통해 확인하실 수 있습니다.
쿠폰은 2가지 타입이 있어요.
- 금액 할인
- 비율 할인
쿠폰 타입에 맞게 결제 금액에서 할인이 적용될 수 있어야 합니다.
 
4. 선택한 제품 주문수 추가/삭제 (ProductControls > CountManager)
<5번 - 결제할 제품 목록>에서 아이템을 선택하고 주문 숫자를 변경할 수 있어요.
버튼을 클릭하면 선택된 제품이 주문 숫자가 업데이트될 수 있어야 합니다.

5. 결제할 제품 목록 (CheckoutList)
<2번 - 제품 목록>에서 아이템을 클릭하여 추가된 제품 목록을 보여주세요.
옵션이 선택된 경우, 적절한 UI로 옵션 정보도 표시할 수 있어야 합니다.

6. 총 결제 (PaymentSummary)
<5번 - 결제할 제품 목록>에 추가된 아이템들의 총 금액 합을 보여주세요.
버튼을 클릭하면, 결제 내역 영수증이 표시되어야 합니다.
결제 내역 영수증 UI은 아래 이미지를 참고하셔서 자유롭게 만들어주세요. -> (PaymentModal)

### 기능 및 사용법
본 프로젝트는 다음 기능을 제공합니다:

카테고리 정보 표시: 사용자는 화면 상단에서 제공되는 카테고리를 확인할 수 있습니다.
제품 목록 및 선택: 사용자는 카테고리를 선택하여 해당 제품들을 볼 수 있으며, 원하는 제품을 클릭하여 결제 목록에 추가할 수 있습니다.
할인 쿠폰 적용: 사용자는 제공된 쿠폰 중 하나를 선택하여 결제 금액에 할인을 적용할 수 있습니다.
결제할 제품 목록 관리: 사용자는 결제할 제품의 수량을 조정하거나 목록에서 제거할 수 있습니다.
총 결제 금액 표시 및 결제: 최종 결제 금액을 확인하고 결제를 진행할 수 있습니다.

### 문제 해결 방법 및 고민한 점
1. 처음에는 상태 변화에 대해 훅으로만 개발을 진행을 하다가 이번에 처음으로 Recoil를 학습 후 적용 해보았습니다.

- Recoil:
Recoil은 Facebook에서 개발된 상태 관리 라이브러리로, 
React의 Hooks API와 잘 통합되어 있습니다. 이 라이브러리는 원자(Atoms)와 선택자(Selectors)라는 두 가지 주요 개념을 도입합니다.
- 
원자(Atoms): 이는 상태의 일부를 나타내며, 어느 컴포넌트에서든지 읽거나 쓸 수 있습니다. 
원자는 고유한 키를 가지며, 해당 키를 통해 상태를 구독하고 갱신할 수 있습니다.
선택자(Selectors): 파생된 상태(derived state)를 생성하는 순수 함수입니다. 
기존의 상태를 입력으로 받아 새로운 데이터를 반환하며, 이는 컴포넌트에서 마치 원자처럼 사용할 수 있습니다.

- 장점:
1. 간결함과 최소성: Recoil은 사용하기 쉬우며, API가 간결해서 배우기가 상대적으로 간단합니다.
2. React와의 긴밀한 통합: Hooks와 같은 React의 기능과 잘 어울리므로 React 개발자에게 직관적입니다.
3. 동시성 모드와 호환성: React의 실험적인 동시성 모드와 호환되도록 설계되었습니다.
4. 성능 최적화: 컴포넌트는 필요한 상태에만 구독하기 때문에 불필요한 리렌더링을 방지합니다.
5. 구조적 공유: 동일한 상태를 공유하는 컴포넌트 간에 메모리 사용을 최적화합니다.

### 향후 개선 사항
1. 시즌별/이벤트별 프로모션 : 이벤트나 시즌별 이미지와 텍스트를 업데이트하여 사용자에게 보여줄 수 있습니다.
2. 환경 설정 : 사용자가 인터페이스의 화면 밝기, 글꼴 크기, 색상 스킨 등을 조절할 수 있는 설정 메뉴를 구현합니다.
3. 다국어 지원 :  언어 선택기를 구현하고 다국어를 위한 리소스 파일을 준비하여 인터페이스에 적용할 수 있습니다.
4. 사용자 피드백 : 사용자로부터 피드백을 받을 수 있는 간단한 양식을 만들어 구현 할 수 있습니다.
5. 영양 정보 및 알레르기 정보 제공 : 각 음료의 상세 페이지에 영양 정보와 알레르기 유발 잠재성분에 대한 정보를 표시합니다.
6. 결제 옵션 다양화 : 결제 인터페이스의 UI를 다양화하고, 사용자가 결제 수단을 선택할 수 있는 옵션을 제공합니다.
7. 사용자 맞춤 추천 : 추천 알고리즘 결과를 사용하여 사용자에게 맞춤 추천을 보여주는 UI를 구현합니다.
8. 재고 관리 시스템 : 재고 상태의 실시간 업데이트를 통해 처리 합니다.
9. 모바일 앱 연동 : 웹 애플리케이션에서 모바일 앱으로의 링크나 특정 기능을 호출할 수 있는 버튼 등을 구현할 수 있습니다.


#### 기타 사항
1. api 일부분 변경 이슈
- 카페 이다보니까 ice와 hot 이 있으면 좋겠다는 판단을 하여 데이터를 추가적으로 변경을 하여 보다 나은 서비스로 업데이트 했습니다.
2. node에 따라 mock 데이터가 안나옴
- 백엔드 node를 따로 분리를 했다면 괜찮았을지는 모르겠지만 최신 버젼에서는 오류가 났었습니다.
3. 향후 개선 프로그램 정보들 > 백엔드가 있다면 추가적으로 할 수 있는 정보들 중에서 재고나 
내지는 영양 정보가 공유가 된다면 더 편안한 환경으로 결제가 가능했을 것 같습니다.
4. 익숙한 기능을 쓰기 위해 css module, axios를 사용을 했었는데 이 점을 리팩토링을 한다면 이전의 코드를 유지 하면서 할 수 있으면 
또 다른 도전에 될 것 같습니다.
5. 미디어 쿼리로 사용자의 모바일 환경에서도 구축 하고자 하였으나 다음 기회가 있다면 보다 적극적인 환경에서 다양한 기계들로 테스트를 해보고 싶습니다.
6. 테스트 코드 작성을 하면서 코드를 리팩토링하면 좋을 것 같습니다.
7. 현재 코드에는 삭제, 추가, 감소에 대한 버튼이 그룹으로 되어 있고 각 아이템마다 진행을 하였습니다. 갯수에 대한 정확한 파악을 하기가 갯수가 일정 갯수 이상 늘어나면 어렵다고 판단을 했기 때문입니다.
