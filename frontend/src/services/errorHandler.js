export function handleApiError(error) {
  if (error.response) {
    throw error.response.data;
  }
  throw new Error('API通信に失敗しました');
}