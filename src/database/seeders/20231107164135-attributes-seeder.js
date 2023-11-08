const uuid = require('uuid');

module.exports = {
	async up (queryInterface, Sequelize) {
		await queryInterface.bulkInsert('attributes', [
            { 
                id : uuid.v4(), 
                name :"Screen Type" , 
                slug : "screen-type"
            },
            { 
                id : uuid.v4(), 
                name :"Graphics Card (GPU)" , 
                slug : "graphics-card-(gpu)"
            },
            { 
                id : uuid.v4(), 
                name :"SIM Card" , 
                slug : "sim-card"
            },
            { 
                id : uuid.v4(), 
                name :"DVI" , 
                slug : "dvi"
            },
            { 
                id : uuid.v4(), 
                name :"VGA" , 
                slug : "vga"
            },
            { 
                id : uuid.v4(), 
                name :"Ethernet" , 
                slug : "ethernet"
            },
            { 
                id : uuid.v4(), 
                name :"Battery Capacity" , 
                slug : "battery-capacity"
            },
            { 
                id : uuid.v4(), 
                name :"MicroSD Card" , 
                slug : "microSD-card"
            },
            { 
                id : uuid.v4(), 
                name :"Processor (CPU)" , 
                slug : "processor-(cpu)"
            },
            { 
                id : uuid.v4(), 
                name :"USB-C" , 
                slug : "usb-c"
            },
            { 
                id : uuid.v4(), 
                name :"HDMI" , 
                slug : "hdmi"
            },
            { 
                id : uuid.v4(), 
                name :"Audio Port" , 
                slug : "audio-port"
            },
            { 
                id : uuid.v4(), 
                name :"Operating System" , 
                slug : "operating-system"
            },
            { 
                id : uuid.v4(), 
                name :"Storage Capacity" , 
                slug : "storage-capacity"
            },
            { 
                id : uuid.v4(), 
                name :"Screen Resolutions" , 
                slug : "screen-resolutions"
            },
            { 
                id : uuid.v4(), 
                name :"Storage Type" , 
                slug : "storage-type"
            },
            { 
                id : uuid.v4(), 
                name :"Screen Size" , 
                slug : "screen-size"
            },
            { 
                id : uuid.v4(), 
                name :"USB" , 
                slug : "usb"
            }
	    ], {});
        
	},

	async down (queryInterface, Sequelize) {
	    await queryInterface.bulkDelete('attributes', null, {});
	}
};
