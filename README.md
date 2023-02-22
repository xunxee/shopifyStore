# ✏️ shopifyStore

## 📌 소개

- Next에서 제공하는 [커머스 데모](https://github.com/vercel/commerce)를 모티브로 한 프로젝트
- webpack과 babel을 활용한 기본적인 프론트엔드 개발 환경 구축
- Redux를 사용한 상태 관리
- Jest, React-Testing-Library를 사용한 TDD 방식으로 개발 진행 중

### 📍 사용 기술

📎 **Front-end**

- React.js(v18)
- react-router-dom(v6)
- Redux Toolkit
- Jest / React Testing Library
- Emotion

📎 **Back-end**

- Firebase(REST)

### 📍 커밋 규칙

- test coverage가 100%에 도달할 때만 commit을 하는 방식으로 프로젝트를 진행 중입니다.

<img src="https://user-images.githubusercontent.com/87808288/220566153-e602f635-b032-4cf6-bff8-d6c42e204d4e.gif" width="80%" style='margin:auto; display: block;'>

## 📌 구현 사항

### 📍 TDD 방식으로 테스트 작성

🔗 **addEventListener의 테스트 코드 만들기**

```jsx
// MembershipPage.test.jsx
describe('MembershipPage', () => {
	beforeEach(() => {
		useSelector.mockImplementation((selector) => selector({
			// ......
		}));
	});

	describe('addEventListener', () => {
		const handleClick = jest.fn();

		beforeEach(() => {
			handleClick.mockClear();
		});

    const mockEvents = () => {
      const events = {};

      EventTarget.prototype.addEventListener = jest.fn(
        (event, callback) => {
          events[event] = callback;
        },
      );

      EventTarget.prototype.removeEventListener = jest.fn(
        (event) => {
          delete events[event];
        },
      );

      return events;
    };

		context('when clicked inside the modal', () => {
      it("doesn't close the modal window", () => {
        const events = mockEvents();

        const { getByTestId } = render(
          <MembershipPage onClick={handleClick} />,
        );

        events.mousedown(
          { target: getByTestId('LoginPage') },
        );

        expect(handleClick).toBeCalledTimes(0);
      });
    });
	});
});
```

모달 창 내부를 클릭했을 때는, 해당 모달 창이 닫히지 않도록 하는 액션을 테스트했습니다.

- addEventListener를 모의 함수로 만들고, mosedown 메서드를 실행시켜 이벤트 핸드러가 실행되었을 때 props로 전달받은 handleClick 함수가 실행되지 않는 것으로 테스트를 검증했습니다.

🔗 **Jest로 error 검증하기**

 💡 *gunhee’s coding blog: [Jest로 error 검증하기](https://xunxee.github.io/fedevenvironment/jest%EB%A1%9Cerror%EA%B2%80%EC%A6%9D%ED%95%98%EA%B8%B0/)*

```jsx
// api.test.js

describe('api', () => {
	const mockFetch = (data) => {
    global.fetch = jest.fn().mockResolvedValue({
      async json() { return data; },
    });
  };

	describe('postLogin', () => {
		context('when login fails', () => {
			beforeEach(() => {
				mockFetch(LOGIN_FAIL_DATA);
			});

			it('throw an error', async () => {
				await expect(async () => {
					await postLogin({
						email: 'tester@example.com',
						password: '',
					});
				}).rejects.toThrowError(new Error('INVALID_PASSWORD'));
			});
		});
	});
});
```

expect.rejects.toThrowError() matcher를 사용하여, 비동기 함수에서 예상한 오류가 발생하는지 확인하였습니다.

### 📍 정규 표현식을 사용한 회원가입 유효성 검사

<img src="https://user-images.githubusercontent.com/87808288/220567543-259cb9d8-054a-44fb-b17d-25b7da28aae6.gif" width="80%" style='margin: auto; display:block;'>

🔗 **onblur와 onChange를 사용한 유효성 검사**

```jsx
// MembershipContainer.jsx
export default function MembershipContainer() {
	const handleChange = useCallback(
    ({ name, value }) => {
      dispatch(changeAccountFields({ name, value }));
      dispatch(checkMemberInfo({ name, value }));
    },
    [dispatch],
  );
	
	const handleBlur = useCallback(
    ({ name, value }) => {
      if (isButtonActive) return;

      dispatch(checkInputValue({ name, value }));
    },
    [dispatch, isButtonActive],
  );

	return (
		<>
			<MembershipForm
        onChange={handleChange}
        onBlur={handleBlur}
      />
			// ......
		</>
	);
}
```

- handleChange() 함수에서는 회원가입 시, 4가지 항목(성, 이름, Email, Password)의 value를 확인하여 모두 유효성을 통과한다면 buttonActive의 값은 true로 변경하여 ‘Sign Up’ 버튼을 활성화한다.
- handleBlur() 함수에서는 blur 이벤트가 발생 시, focus가 잡혀있던 input의 value를 확인하여 유효성이 맞지 않다면 그에 맞는 validation message를 생성한다.

💡 *gunhee’s Notion: [Login 유효성 검사 함수 리팩터링](https://www.notion.so/5e4b4181d28c46a79d140cb7d1f0ef30)*

### 📍 제품 리스트 페이지

<img src="https://user-images.githubusercontent.com/87808288/220569835-fe7780c8-4991-4fad-aa8e-0d468c89c38d.gif" width="80%" style="margin:auto; display: block;">

🔗 **리스트 페이지에서 공용으로 적용되는 Card 컴포넌트 제작**

```jsx
// ItemCard.jsx
const Wrapper = styled.div(({ hoverColor }) => ({
	position: 'relative',
	// ......
	marginLeft: '3%',
	marginBottom: '3%',
	'&:hover': {
		'h3, span': {
			backgroundColor: hoverColor
		},
	},
}));

export default function ItemCard({
	product: {
		id, title, // .......
	},
}) {
	function makeHoverColor() {
    const number = id % 10;

    return itemCardHoverList[number];
  }

	return (
		<Wrapper hoverColor={makeHoverColor()}>
			// ......
		</Wrapper>
	);
};
```

- hoverColor를 만들고, Wrapper 객체에 props로 전달하여 hover 시 지정된 color로 변경되도록 구현
- Wrapper 객체에 left와 bottom에 margin 값을 넣어서, map 메서드로 화면에 렌더링 될 때 자동으로 좌우 간격이 맞도록 스타일을 적용

<img src="https://user-images.githubusercontent.com/87808288/220570311-98c1576e-e274-4fd2-b244-f2e387cfb324.png" width="80%" style="margin:auto; display: block;">

### 📍 라이브러리 사용하지 않고, 무한 슬라이드 만들기

<img src="https://user-images.githubusercontent.com/87808288/220570521-7db2c304-9847-4fbc-badf-70df6bba097f.gif" width="70%" style="margin: auto; display: block;">

💡 *gunhee’s coding blog: [라이브러리 없이, 무한 슬라이드 구현하기](https://xunxee.github.io/react/%EB%AC%B4%ED%95%9C%EC%8A%AC%EB%9D%BC%EC%9D%B4%EB%93%9C%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0/)*

### 📍 동적 쿼리 스트링 만들기

<img src="https://user-images.githubusercontent.com/87808288/220570955-72ae2cb4-3f4a-45bd-a373-49237ab3ad7e.gif" width="80%" style="margin: auto; display: block;">

- 반복문을 사용하여 중복되는 코드를 제거하기 위해 노력했습니다.
    
    ```jsx
    // urlStates의 예시
    // const urlState= {
    // 	 product: 'sofoas',
    //	 category: 'new',
    //	 sort: 'trending',
    //	 material: 'fabric',
    // };
    
    function makeSearch() {
    	const searchEntries = Object.entries(urlStates)
    		.filter(([categoryName]) => url.searches.includes(categoryName));
    	
    	searchEntries.forEach(([categoryName, categoryValue]) => {
    	  if (!categoryValue) return;
    	
    	  if (search.length) {
    			search.push(`&${categoryName}=${categoryValue}`);
    	
    		  return;
    	  }
    	
    	  search.push(`?${categoryName}=${categoryValue}`);
    	});
    }
    ```
