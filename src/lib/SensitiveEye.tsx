export function SensitiveEye({ visible = false, ...props }) {
  return (
    <svg width={20} height={15} {...props}>
      <g fill="none" fillRule="evenodd">
        <path
          d="M8.171 3.575c-2.681.477-4.894 1.734-6.55 3.937a9.668 9.668 0 003.464 2.942c.976.5 2.006.837 3.09 1.004-1.572-.848-2.485-2.13-2.485-3.94s.913-3.093 2.481-3.943m3.65 7.886c2.677-.491 4.92-1.715 6.574-3.94a9.512 9.512 0 00-2.902-2.63c-1.053-.621-3.175-1.368-3.679-1.301 1.572.834 2.482 2.116 2.485 3.92.003 1.81-.907 3.096-2.479 3.951M10 3.611c-2.138 0-3.91 1.744-3.912 3.85-.001 2.189 1.724 3.962 3.857 3.963 2.196.002 3.956-1.73 3.956-3.893a3.909 3.909 0 00-3.9-3.92m.098 8.432c-2.412-.038-4.438-.623-6.27-1.84A9.744 9.744 0 011.25 7.71c-.122-.172-.123-.22.002-.393 1.387-1.915 3.24-3.166 5.49-3.849a11.076 11.076 0 013.103-.466 11.299 11.299 0 015.317 1.234 9.904 9.904 0 013.614 3.094c.114.158.114.212.002.37a9.82 9.82 0 01-3.42 3.004 11.038 11.038 0 01-4.055 1.262c-.472.05-.947.062-1.203.078"
          fill="rgb(105, 116, 137)"
        />
        <g stroke="rgb(105, 116, 137)">
          <path
            d="M8.131 3.572c-2.726.475-4.976 1.726-6.66 3.919.94 1.262 2.12 2.224 3.522 2.928.993.498 2.04.833 3.143 1-1.599-.844-2.528-2.121-2.528-3.922 0-1.801.929-3.078 2.523-3.925zm3.71 7.849c2.723-.489 5.003-1.707 6.685-3.92a9.601 9.601 0 00-2.95-2.619c-1.07-.618-3.229-1.361-3.74-1.295 1.597.83 2.523 2.107 2.526 3.901.003 1.802-.922 3.082-2.52 3.933zm-1.85-7.812c-2.174 0-3.976 1.735-3.977 3.832a3.931 3.931 0 003.921 3.944c2.232.001 4.022-1.723 4.022-3.875 0-2.155-1.774-3.901-3.966-3.901zm.1 8.391c-2.452-.037-4.512-.62-6.374-1.83a9.816 9.816 0 01-2.624-2.483c-.124-.172-.125-.218.003-.391 1.41-1.906 3.294-3.151 5.58-3.83A11.487 11.487 0 019.832 3a11.692 11.692 0 015.406 1.228 10.015 10.015 0 013.675 3.08c.116.157.116.21.002.367a9.921 9.921 0 01-3.477 2.99 11.399 11.399 0 01-4.123 1.256c-.48.05-.964.062-1.224.078z"
            strokeWidth={0.5}
          />
          {visible ? <path d="M15 0L6 15" strokeLinecap="square" /> : null}
        </g>
      </g>
    </svg>
  );
}