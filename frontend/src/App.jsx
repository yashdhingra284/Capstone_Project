// after redirect from provider, backend already set cookie; client should call /api/me to fetch user
useEffect(() => {
  fetch('/api/me', { credentials: 'include' })
    .then(r => r.json())
    .then(setUser)
    .catch(()=>setUser(null));
}, []);