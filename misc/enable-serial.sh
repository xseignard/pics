#!/bin/bash
echo "dwc_otg.lpm_enable=0 console=tty1 root=/dev/mmcblk0p2 rootfstype=ext4 elevator=deadline fsck.repair=yes rootwait" > /boot/cmdline.txt
systemctl disable serial-getty@ttyAMA0.service
