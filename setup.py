from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in dms/__init__.py
from dms import __version__ as version

setup(
	name="dms",
	version=version,
	description="DMS",
	author="Trigger Solutions",
	author_email="ahmedosama.dev@gmail.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
