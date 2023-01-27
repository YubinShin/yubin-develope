import React from "react";

function Post(props) {
  return (
    <div>
      <div className="content post-wrap">
        <h2>새 글쓰기</h2>
        <form action="http://localhost:8080/add" method="POST">
          <div className="input-box">
            <label htmlFor="title">제목</label>
            <input type="text" name="title" id="title" />
          </div>
          <div className="input-box">
            <label htmlFor="content">내용</label>
            <textarea name="content" id="content" cols="30" rows="5"></textarea>
          </div>
          <button type="submit">저장하기</button>
        </form>
      </div>
    </div>
  );
}

export default Post;
