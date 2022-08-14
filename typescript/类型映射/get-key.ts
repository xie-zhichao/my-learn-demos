type GetKey<T> = {
  [key in keyof T] : keyof T[key] extends never? T[key] : GetKey<T[key]>
}

const configs = {
  'fade-in': {
    keyframes: [
      { opacity: 0, transform: 'scale(0)' },
      { opacity: 1, transform: 'scale(1)' },
    ],
    options: {
      duration: 100,
    },
  },
  'fade-out': {
    //...
  },
}

type TAnimates = GetKey<typeof configs>

interface A {
  name: string;
  age: number;
}
