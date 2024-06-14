## Node

> Using fnm to use .node-version

- npm
- node -v 20.14.0

## Architecture

### Architecture Rule #1

1. Layout > RootLayout, AuthorizationLayout, UserLayout

- RootLayout에서는 Client에서 Redux 전역 변수를 사용하기 위한 Redux-Provider들과 Query-Provider로 구성 되어 있음. Redux-Provider의 종류는 Position, Device상태를 받음. Position은 Web Api중 하나인 Geolocation Api를 사용해 실시간으로 위치를 갱신을 시키고, Position은 초기 앱 또는 웹에서 진입 시 SafeArea영역과 device정보를 나타냄. Query-Provider는 Server에서 호출한 Data를 Client에서 Hydration을 위함.

- AuthorizationLayout에서는 Supabase Auth 인증을 받지 않는 유저는 "/auth/login"으로 redirect 시킴.

- UserLayout에서는 User 정보가 없는 유저는 "/user/add"로 redirect 시킴.

> 이 Layout들은 Root > Authorization > User 로 Nested되어 있고 각 레이아웃 단계에 따라 Authorization되지 않거나 User가 아닌 사람들에게 보여줄 페이지를 관리할 수 있음.

2. Page > Suspense > Fetcher > Controller > View

- 각 페이지는 Suspense > Fetcher > Controller > View 로 구성되어 있음. Suspense는 Fetcher가 데이터를 불러오는 동안 Fallback을 담당. Fetcher는 데이터 불러오기 담당. Controller는 페이지에 필요한 비즈니스 로직을 담당. View는 UI를 담당함.

3. Error

- 각 페이지는 Error 담당 Error.tsx가 있음.

### Architecture Rule #2

1. Fetch & Next

- 기본적으로 데이터는 Server Component에서 Fetch함수를 사용해서 불러옴. 마찬가지로 POST, PUT, DELETE 같은 method들도 Server Action으로 Server에서 Execute함. (부분적으로 Client에서 호출 함)

- revalidate시간은 5분, tag는 "/treasure/16" 이런식으로 해당 도메인 관련 키로 구성되어 있음.

2. Uri

- 도메인의 uri는 "/treasure/{{treasure_id}}/comment/{{comment_id}}" 이런식으로 "A/A의id" 이런식으로 구성되어 있음.

> user는 user_id가 쿠키에 담겨있는 token 값을 통해 알 수 있기 때문에 user뒤에는 적용되지 않음

3. Data Hydration

- Fetcher에서 InitialData를 불러온 뒤 Fetcher하위에 컴포넌트들에 Hydration해줌.

## Image

Using supabase storage

### Image Rule #1

1. 이미지를 버킷 /tmp/{{v4()}} 에 저장한 뒤 path를 return -> 이미지가 들어있지 않은 글을 작성한 뒤 treasure_id를 return -> 이미지를 버킷 /treasure/{{treasure_id}}로 옮긴 후 글의 이미지를 이 path로 수정

> 이방식은 처음에 2번째 과정인 이미지가 들어있지 않은 글을 작성했을 때 유저가 조회할 수 있는 문제가 발생하기때문에 위험

2. 글을 작성한뒤 treasure_id를 return -> 이미지를 버킷 /treasure/{{treasure_id}}에 저장한 뒤 path를 return -> 글의 이미지를 이 path로 수정

> 이 방식은 1번 방식과 마찬가지로 이미지가 들어있지 않은 글을 작성했을 때 유저가 조회할 수 있는 문제가 발생하기 때문에 위험하다. 이 전 과정을 transaction을 통해 무결성을 보장해서 해결할 수 있음. supabase에서 transaction을 직접적으로 사용할 수 없기 때문에 rpc로 직접 SQL 쿼리를 호출해서 transaction 과정을 진행해야 함.

3. 이미지를 버킷 /treasure/{{v4()}} 에 저장한 뒤 path를 return -> 글을 추가할때 이 path를 직접적으로 사용

> 이 방식은 과정이 제일 단순하고 복잡도가 낮으나 /treasure 밑으로 이미지가 굉장히 많이 쌓이게 되어서 관리하기 어려운 구조.

#### 일단 3번으로 진행...🥹 DB 테이블 설계가 확실하게 되면 2번으로 바꿀 예정

### Image Rule #2

1. image path는 뒤에 쿼리로 ?updatedAt={{timeStamp}}가 들어감

> Next에서 해당 이미지 url에 대한 이미지 파일을 캐싱하기 때문에, 쿼리 파라미터로 경로를 바꿔서 path의 경로를 다르게 하여 수정된 이미지의 변화를 보여주기 위함.

### Image Policy

- Max Size: 20mb
- Size <= 5mb: [HTTP protocol](https://supabase.com/docs/guides/storage/uploads/standard-uploads)
- Size > 5mb: [TUS protocol](https://supabase.com/docs/guides/storage/uploads/resumable-uploads)

## Etc

moo!
