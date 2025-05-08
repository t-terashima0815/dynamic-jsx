export default function LoginPage() {
  return <>
    <h1>ログインページ</h1>
    <form>
      <div>
        <label htmlFor="username">ユーザー名:</label>
        <input type="text" id="username" name="username" />
      </div>
      <div>
        <label htmlFor="password">パスワード:</label>
        <input type="password" id="password" name="password" />
      </div>
      <button type="submit">ログイン</button>
    </form>
  </>
}
