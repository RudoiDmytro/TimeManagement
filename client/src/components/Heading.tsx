interface IHeading {
	title: string
}

export const Heading = ({ title }: IHeading) => {
    return <div>
        <h1 className="text-3xl font-medium text-card-foreground p-1">{title}</h1>
        <div className="my-2 h-0.5 bg-border w-full"/>
    </div> 
}
