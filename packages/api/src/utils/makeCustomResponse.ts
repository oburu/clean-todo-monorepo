type CustomResponse = {
  status: boolean;
  error?: object | null;
  content?: object | null;
};

export function makeCustomResponse({ status, error = null, content = null }: CustomResponse) {
  return { status, error, content };
}
