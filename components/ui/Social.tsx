import { Icon } from '@/components/Icon';
import { socialLinks } from '@/config/footer';

const Social = () => {
	return (
		<div className='flex gap-5 items-center'>
			{socialLinks.map((link, i) => (
				<a
					key={i}
					href={link.url}
					target='_blank'
					rel='noopener noreferrer'
					className=''
				>
					<Icon
						name={link.name}
						className='transition-all duration-200 hover:stroke-accent-secondary'
						size={22}
					/>
				</a>
			))}
		</div>
	);
};

export default Social;
