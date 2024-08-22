# reply-board-front

reply-board 프로젝트의 front 부분을 vue로 생성

## 프로젝트 빌드

`npm run build`

dist 디렉토리(빌드된 파일)를 reply-board 스프링부트 리포지토리의 프로젝트를 clone 받은 후에 main/resource/static 폴더에 옮긴 후 프로젝트를 실행하면 된다.  

```bash
static
  - assets
    - index.js
    - index.css
  - index.html
  - favicon.ico
```

- [reply-board-backend](https://github.com/RoodyK/reply-board)

위처럼 트리구조를 이루면 된다.   
<br/>
<br/>

### tsyringe 라이브러리

[tsyringe](https://github.com/microsoft/tsyringe)

<br/>

Microsoft가 개발한 자바스크립트와 타입스크립트를 위한 의존성 주입 라이브러리다.  
tsyringe를 사용해서 클래스의 생성자 주입을 통해서 의존성 주입을 깔끔하게 구현할 수 있다.  

스프링 개발자에게 익숙한 빈을 생성할 때 Scope를 Singletone으로 할 것인지, Prototype으로 할 것인지를 애노테이션을 통해서 정할 수 있다.  

- @injectable(): 클래스가 매번 새로운 인스턴스를 생성한다. 의존성이 필요한 클래스에서 주입받을 때 매번 새로운 객체를 주입받는다.
- singleton(): 클래스의 인스턴스가 하나만 생성된다. 애플리케이션에서 같은 인스턴스를 공유하게 된다.
- @inject(): 의존성 주입이 필요한 클래스에서 생성자에 의존성 주입을 할 때 사용한다.

<br/>
<br/>

### reflect-metadata
타입스크립트에서 메타데이터를 처리하기 위한 라이브러리다.  
타입스크립트가 자바스크립트의 상위집합이기 때문에 자바스크립트에서도 사용할 수 있다.  

이 라이브러리는 타입스크립트에서 데코레이터와 메타데이터를 다루기 위해 사용되며, 클래스, 메서드, 프로퍼티에 메타데이터를 정의하고 접근할 수 있게 해준다.  

<br/>
<br/>

