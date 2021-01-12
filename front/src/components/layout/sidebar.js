import React from 'react';
import Newproject from '../projects/newproject';
import Projectslist from '../projects/listprojects';

const Sidebar = () => {
	return ( 
		<aside>
			<h1> DAM <span>Tasks Manager</span></h1>
				<Newproject/>
			<div className="proyectos">
				<h2>Projects</h2>
				<Projectslist/>
			</div>

		</aside>
	 );
}
 
export default Sidebar;