const variants = {
    primary: `
    bg-h
    border-h
    text-white
    hover:bg-hover
    `,
    outline: `
    bg-transparent
    border-white
    text-white
    hover:bg-white
    hover:text-black
    `
};

export default function Button({
    children,
    variant= 'primary',
    classname="",
    ...props
    }) {
    return(
        <button
        className={`
        px-4 py-2
        rounded-full
        border
        transition
        cursor-pointer
        ${variants[variant]}
        ${classname}
        `} {...props}
        >
            {children}
        </button>
    )
}