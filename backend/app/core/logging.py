# backend/app/core/logging.py

import logging
from logging.config import dictConfig

LOGGING_CONFIG = {
	"version": 1,
	"disable_existing_loggers": False,
	"formatters": {
			"default": {
				"()": "logging.Formatter",
				"fmt": "[%(asctime)s] %(levelname)s - %(name)s - %(message)s",
				"datefmt": "%Y-%m-%d %H:%M:%S",
			},
		},
		"handlers": {
			"console": {
                "class": "logging.StreamHandler",
                "formatter": "default",
			},
			"file": {
				"class": "logging.FileHandler",
				"filename": "logs/mins.log",
				"formatter": "default",
			},
		},
		"root": {
			"handlers": ["console","file"],
			"level": "INFO",
		}
	}

	def setup_logging():
		dictConfig(LOGGING_CONFIG)
	
			