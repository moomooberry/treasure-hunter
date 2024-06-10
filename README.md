## Node

> Using fnm to use .node-version

- npm
- node -v 20.14.0

## Image

Using supabase storage

> Image Rule #1

1. 이미지를 버킷 /tmp/{{v4()}} 에 저장한 뒤 path를 return -> 이미지가 들어있지 않은 글을 작성한 뒤 treasure_id를 return -> 이미지를 버킷 /treasure/{{treasure_id}}로 옮긴 후 글의 이미지를 이 path로 수정

-> 이방식은 처음에 2번째 과정인 이미지가 들어있지 않은 글을 작성했을 때 유저가 조회할 수 있는 문제가 발생하기때문에 위험

2. 글을 작성한뒤 treasure_id를 return -> 이미지를 버킷 /treasure/{{treasure_id}}에 저장한 뒤 path를 return -> 글의 이미지를 이 path로 수정

-> 이 방식은 1번 방식과 마찬가지로 이미지가 들어있지 않은 글을 작성했을 때 유저가 조회할 수 있는 문제가 발생하기 때문에 위험하다. 이 전 과정을 transaction을 통해 무결성을 보장해서 해결할 수 있음. supabase에서 transaction을 직접적으로 사용할 수 없기 때문에 rpc로 직접 SQL 쿼리를 호출해서 transaction 과정을 진행해야 함.

3. 이미지를 버킷 /treasure/{{v4()}} 에 저장한 뒤 path를 return -> 글을 추가할때 이 path를 직접적으로 사용

-> 이 방식은 과정이 제일 단순하고 복잡도가 낮으나 /treasure 밑으로 이미지가 굉장히 많이 쌓이게 되어서 관리하기 어려운 구조.

### 일단 3번으로 진행...🥹 DB 테이블 설계가 확실하게 되면 2번으로 바꿀 예정

> Image Rule #2

1. image path는 뒤에 쿼리로 ?updatedAt={{timeStamp}}가 들어감

-> Next에서 해당 이미지 url에 대한 이미지 파일을 캐싱하기 때문에, 쿼리 파라미터로 경로를 바꿔서 path의 경로를 다르게 하여 수정된 이미지의 변화를 보여주기 위함.

> Image Policy

- Max Size: 20mb
- Size <= 5mb: [HTTP protocol](https://supabase.com/docs/guides/storage/uploads/standard-uploads)
- Size > 5mb: [TUS protocol](https://supabase.com/docs/guides/storage/uploads/resumable-uploads)

## Etc

moo!
